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

const inputValidation = Yup.object({
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

const valueValidation = Yup.object({
    start: Yup.date(),
    end: Yup.date().when('start', (start: string) => {
        return Yup.date().min(start, 'end time must be later than start time');
    }),
});

const UntilLabel = styled.div`
    padding: 1em 1em;
`;

const DurationLabel = styled.div`
    padding: 1em 1em;
    width: 100px;
`;

export interface TimePickerValues {
    start?: Date | null;
    end?: Date | null;
    duration?: string;
}

export interface TimePickerInputValues {
    start: string;
    end: string;
    date: Date;
}

interface TimePicker {
    className?: string;
    value?: TimePickerValues | null;
    onChange?: (values: TimePickerValues) => void;
}

const TIME_FORMAT = 'H:mm';
const DATE_FORMAT = 'D-M-YYYY';
const DATE_TIME_FORMAT = 'D-M-YYYY H:mm';

const formatDuration = (duration: moment.Duration) => {
    return moment.utc(duration.asMilliseconds()).format('H:mm');
};

const ErrorLabel = styled.div`
    width: 100%;
    flex-basis: 100%;
    font-size: 14px;
    padding: 0 1em;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 14px;
`;

const TimePicker = ({ className, value, onChange }: TimePicker) => {
    const defaultValues = {
        start: null,
        end: null,
        duration: undefined,
    };

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

    const [values, setValues] = React.useState<TimePickerValues>(
        value || defaultValues
    );

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

        const start = moment(
            date.format(DATE_FORMAT) + ' ' + inputValues.start,
            DATE_TIME_FORMAT
        );
        const end = moment(
            date.format(DATE_FORMAT) + ' ' + inputValues.end,
            DATE_TIME_FORMAT
        );

        await valueValidation
            .validate({ start, end })
            .then(result => {
                const duration = moment.duration(end.diff(start));
                const newValues = {
                    start: start && start.toDate(),
                    end: end && end.toDate(),
                    duration: formatDuration(duration),
                };
                setValues(newValues);
                if (onChange) {
                    onChange(newValues);
                }
            })
            .catch(error => {
                setValues({});
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const onChangeInputField = async (
        field: string,
        value: boolean | number | string | Date | null
    ) => {
        const input = { ...inputValues };
        dotProp.set(input, field, value);

        await inputValidation
            .validate(input)
            .then(result => {
                determineValues(result);
                const errors = new Map(inputErrors);
                errors.delete(field);
                setInputErrors(errors);
                setInputValues(result);
            })
            .catch(error => {
                setInputValues(input);
                setValues({});
            });
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
            });
    };

    const onFocus = (field: string) => {
        setFocusedField(field);
        if (!touched.has(field)) {
            const t = new Map(touched);
            t.set(field, true);
            setTouched(t);
        }
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
                    onChange={e => {
                        onChangeInputField('start', e.currentTarget.value);
                    }}
                    prefix={<TimeManagement />}
                    width="70px"
                    onBlur={() => onBlur('start')}
                    hasError={
                        touched.has('start') &&
                        focusedField !== 'start' &&
                        inputErrors.has('start')
                    }
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
                    hasError={
                        touched.has('end') &&
                        focusedField !== 'end' &&
                        inputErrors.has('end')
                    }
                    prefix={<TimeManagement />}
                    width="70px"
                />

                <DurationLabel>
                    {!!values.duration && `${values.duration} duration`}
                </DurationLabel>
            </Wrapper>
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
    }
`;
