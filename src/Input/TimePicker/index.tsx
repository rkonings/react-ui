import dotProp from 'dot-prop';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import * as Yup from 'yup';

import { TimeManagement } from '../../Icon';
import DateRangePicker from '../DatePicker';
import TextField from '../TextField/TextField';

import { mapValidationErrors, ValidationErrors } from '../../Validation';

import { ErrorText } from '../Core/ErrorText';

export const inputValidation = Yup.object({
    start: Yup.string().matches(
        /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/,
        'start time is not valid'
    ),
    end: Yup.string().matches(
        /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/,
        'end time is not valid'
    ),
    date: Yup.date().required('date is required'),
});

export const valueValidation = Yup.object({
    start: Yup.date(),
    end: Yup.date().when('start', (start: string) => {
        return Yup.date().min(start, 'end time must be later than start time');
    }),
});

export const UntilLabel = styled.div`
    padding: 1em 1em;
`;

export const DurationLabel = styled.div`
    padding: 1em 1em;
    width: 100px;
`;

export type TimePickerValues = {
    start: Date | null;
    end: Date | null;
    duration?: string;
} | null;

export interface TimePickerInputValues {
    start: string;
    end: string;
    date: Date;
}

interface TimePicker {
    className?: string;
    value?: TimePickerValues;
    onChange?: (values: TimePickerValues | null) => void;
    errorText?: string;
}

export const TIME_FORMAT = 'H:mm';
export const DATE_FORMAT = 'D-M-YYYY';
export const DATE_TIME_FORMAT = 'D-M-YYYY H:mm';

export const formatDuration = (duration: moment.Duration) => {
    return moment.utc(duration.asMilliseconds()).format('H:mm');
};

export const ErrorLabel = styled.div`
    width: 100%;
    flex-basis: 100%;
    font-size: 14px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 14px;
    width: 100%;
`;

export const getDateTime = (date: Date, time: string) => {
    return moment(
        moment(date).format(DATE_FORMAT) + ' ' + time,
        DATE_TIME_FORMAT
    );
};

export const determineDuration = async (
    date: Date,
    start: string,
    end: string
) => {
    let startDate: moment.Moment;
    let endDate: moment.Moment;

    const validationResult = await inputValidation
        .validate({ start, end, date })
        .catch(r => r);
    if (validationResult instanceof Yup.ValidationError) {
        throw validationResult;
    }

    startDate = getDateTime(date, start);
    endDate = getDateTime(date, end);

    return valueValidation
        .validate({
            start: startDate.toDate(),
            end: endDate.toDate(),
        })
        .then(result => {
            const duration = moment.duration(endDate.diff(startDate));

            return {
                start: result.start,
                end: result.end,
                duration,
            };
        })
        .catch(error => {
            throw error;
        });
};

const TimePicker = ({ className, value, onChange, errorText }: TimePicker) => {
    const defaultInputValues = {
        start: '',
        end: '',
        date: new Date(),
        duration: undefined,
    };

    const [focusedField, setFocusedField] = React.useState<string>();
    const [touched, setTouched] = React.useState<Map<string, boolean>>(
        new Map()
    );

    const [inputValues, setInputValues] = React.useState<TimePickerInputValues>(
        defaultInputValues
    );

    const [values, setValues] = React.useState<TimePickerValues>(value || null);

    React.useEffect(() => {
        const defaultInputValues = {
            start:
                (value &&
                    value.start &&
                    moment(value.start).format(TIME_FORMAT)) ||
                '',
            end:
                (value && value.end && moment(value.end).format(TIME_FORMAT)) ||
                '',
            date: (value && value.start) || new Date(),
        };

        setInputValues(defaultInputValues);
    }, [value]);

    const [inputErrors, setInputErrors] = React.useState<ValidationErrors>(
        new Map()
    );

    const determineValues = async (inputValues: TimePickerInputValues) => {
        const date = moment(inputValues.date);
        let start: moment.Moment | null = null;
        let end: moment.Moment | null = null;
        let duration;

        const validationResult = await inputValidation
            .validate(inputValues)
            .catch(r => r);

        if (validationResult instanceof Yup.ValidationError) {
            return;
        }
        start =
            (inputValues.start &&
                moment(
                    date.format(DATE_FORMAT) + ' ' + inputValues.start,
                    DATE_TIME_FORMAT
                )) ||
            null;
        end =
            (inputValues.end &&
                moment(
                    date.format(DATE_FORMAT) + ' ' + inputValues.end,
                    DATE_TIME_FORMAT
                )) ||
            null;

        await valueValidation
            .validate({
                start: start && start.toDate(),
                end: end && end.toDate(),
            })
            .then(result => {
                if (start && end) {
                    duration = formatDuration(moment.duration(end.diff(start)));
                    setInputErrors(new Map());
                }
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });

        const newValues: TimePickerValues = {
            start: (start && start.toDate()) || null,
            end: (end && end.toDate()) || null,
            duration,
        };

        setValues(newValues);
        if (onChange) {
            onChange(newValues);
        }
    };

    const onChangeInputField = async (
        field: string,
        value: boolean | number | string | Date | null
    ) => {
        const input = { ...inputValues };
        dotProp.set(input, field, value);
        setInputValues(input);
        determineValues(input);
    };

    const onFocus = (field: string) => {
        setFocusedField(field);
        if (!touched.has(field)) {
            const t = new Map(touched);
            t.set(field, true);
            setTouched(t);
        }
    };

    const onBlur = async (field: string) => {
        await inputValidation
            .validateAt(field, inputValues)
            .then(() => {
                const errors = new Map(inputErrors);
                errors.delete(field);
                setInputErrors(errors);
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
                setValues(null);
            });
    };

    const currentDate = moment();

    return (
        <div className={className}>
            <Wrapper>
                <DateRangePicker
                    amountMonths={1}
                    startYear={currentDate.year()}
                    endYear={currentDate.year()}
                    onChange={date => {
                        onChangeInputField('date', date && date.toDate());
                    }}
                    value={inputValues.date && moment(inputValues.date)}
                />
                <TextField
                    value={inputValues.start}
                    onFocus={() => onFocus('start')}
                    onBlur={() => onBlur('start')}
                    onChange={e => {
                        onChangeInputField('start', e.currentTarget.value);
                    }}
                    prefix={<TimeManagement />}
                    width="70px"
                    hasError={inputErrors.size > 0}
                    placeHolder={moment().format(TIME_FORMAT)}
                />
                <UntilLabel>tot</UntilLabel>
                <TextField
                    placeHolder={moment().format(TIME_FORMAT)}
                    value={inputValues.end}
                    onFocus={() => onFocus('end')}
                    onChange={e =>
                        onChangeInputField('end', e.currentTarget.value)
                    }
                    onBlur={() => onBlur('end')}
                    hasError={inputErrors.size > 0}
                    prefix={<TimeManagement />}
                    width="70px"
                />

                <DurationLabel>
                    {values &&
                        !!values.duration &&
                        `${values.duration} duration`}
                </DurationLabel>
            </Wrapper>
            {errorText && (
                <ErrorLabel>
                    <ErrorText>{errorText}</ErrorText>
                </ErrorLabel>
            )}
            {inputErrors.size > 0 && (
                <ErrorLabel>
                    <ErrorText>{inputErrors.get('end')}</ErrorText>
                </ErrorLabel>
            )}
        </div>
    );
};

export default styled(TimePicker)`
    ${TextField} {
        margin: 0 1em;

        &:first-child {
            margin-left: 0;
        }
    }
`;
