import React from 'react';
import styled from 'styled-components';

import moment from 'moment';
import TextField from '../Input/TextField/TextField';

import dotProp from 'dot-prop';
import { ChangedItems, InputField, OnChangeHandler } from '../Form';
import { mapValidationErrors, ValidationErrors, Yup } from '../Validation';

import DateRangePicker from '../Input/DatePicker';

import { TimeManagement } from '../Icon';

import { ValidationError } from 'yup';
import Button from '../Button/Button';
import {
    determineDuration,
    DurationLabel,
    formatDuration,
    TIME_FORMAT,
    UntilLabel,
    Wrapper,
} from '../Input/TimePicker';

interface Task {
    className?: string;
    onChange: OnChangeHandler;
}

interface TaskInputValues {
    title: string;
    description: string;
    start: string;
    end: string;
    date: Date;
}

interface TaskValues {
    title: string;
    description: string;
    start: Date | null;
    end: Date | null;
    duration?: moment.Duration;
}

export const inputValidation = Yup.object({
    title: Yup.string().required(),
    description: Yup.string(),
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

const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string(),
    start: Yup.date().nullable(),
    end: Yup.date()
        .nullable()
        .when('start', (start: string) => {
            if (start) {
                return Yup.date().min(start);
            }
            return Yup.date().nullable();
        }),
});

const Task = ({ className, onChange }: Task) => {
    const [values, setValues] = React.useState<TaskValues>({
        title: '',
        description: '',
        start: null,
        end: null,
    });

    const [inputValues, setInputValues] = React.useState<TaskInputValues>({
        title: '',
        description: '',
        start: '',
        end: '',
        date: new Date(),
    });
    const [inputErrors, setInputErrors] = React.useState<ValidationErrors>(
        new Map()
    );

    const onChangeDuration = async (
        field: string,
        value: boolean | number | string | Date | null
    ) => {
        const nextInputvalues = { ...inputValues };
        dotProp.set(nextInputvalues, field, value);
        setInputValues(nextInputvalues);

        await determineDuration(
            nextInputvalues.date,
            nextInputvalues.start,
            nextInputvalues.end
        )
            .then(result => {
                setValues({
                    ...values,
                    start: result.start,
                    end: result.end,
                    duration: result.duration,
                });

                const errors = new Map(inputErrors);
                errors.delete('date');
                errors.delete('start');
                errors.delete('end');
                setInputErrors(errors);
            })
            .catch(error => {
                setValues({
                    ...values,
                    start: null,
                    end: null,
                    duration: undefined,
                });

                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const onChangeInputField = async (
        field: string,
        value: boolean | number | string | Date | null
    ) => {
        const nextInputValues = { ...inputValues };
        dotProp.set(nextInputValues, field, value);

        const nextValues = { ...values };

        await inputValidation
            .validateAt(field, nextInputValues)
            .then(() => {
                const errors = new Map(inputErrors);
                dotProp.set(nextValues, field, value);

                errors.delete(field);
                setInputErrors(errors);
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });

        setInputValues(nextInputValues);
        setValues(nextValues);
    };

    const onSave = async () => {
        const inputValidationResult = await inputValidation
            .validate(inputValues, { abortEarly: false })
            .then(() => {
                setInputErrors(new Map());
                return true;
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
                return error;
            });

        if (inputValidationResult instanceof ValidationError) {
            return;
        }

        await validationSchema
            .validate(values, { abortEarly: false })
            .then(() => {
                setInputErrors(new Map());
                const result = Object.entries(values).map(([key, value]) => ({
                    field: key,
                    value,
                }));
                onChange(
                    result as ChangedItems,
                    { saveFields: true },
                    () => {}
                );
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const currentDate = moment();

    const hasTimePickerErrors = () => {
        return (
            inputErrors.has('start') ||
            inputErrors.has('end') ||
            inputErrors.has('date')
        );
    };

    return (
        <div className={className}>
            <TextField
                grow={true}
                value={inputValues.title}
                placeHolder="Enter task"
                onChange={e =>
                    onChangeInputField('title', e.currentTarget.value)
                }
                errorText={inputErrors.get('title')}
            />
            <InputField spacingBottom="1em">
                <Wrapper>
                    <DateRangePicker
                        amountMonths={1}
                        startYear={currentDate.year()}
                        endYear={currentDate.year()}
                        onChange={date => {
                            onChangeDuration('date', date && date.toDate());
                        }}
                        value={inputValues.date && moment(inputValues.date)}
                    />
                    <TextField
                        value={inputValues.start}
                        onChange={e => {
                            onChangeDuration('start', e.currentTarget.value);
                        }}
                        prefix={<TimeManagement />}
                        width="70px"
                        hasError={hasTimePickerErrors()}
                        placeHolder={moment().format(TIME_FORMAT)}
                    />
                    <UntilLabel>tot</UntilLabel>
                    <TextField
                        placeHolder={moment().format(TIME_FORMAT)}
                        value={inputValues.end}
                        onChange={e =>
                            onChangeDuration('end', e.currentTarget.value)
                        }
                        hasError={hasTimePickerErrors()}
                        prefix={<TimeManagement />}
                        width="70px"
                    />

                    <DurationLabel>
                        {values &&
                            !!values.duration &&
                            `${formatDuration(values.duration)} duration`}
                    </DurationLabel>
                </Wrapper>
            </InputField>

            <InputField spacingBottom="1em">
                <Button size="s" onClick={() => onSave()}>
                    Save
                </Button>
            </InputField>
        </div>
    );
};

export default styled(Task)`
    ${Wrapper} {
        ${TextField} {
            margin: 0 1em;

            &:first-child {
                margin-left: 0;
            }
        }
    }
`;
