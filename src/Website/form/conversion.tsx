import dotProp from 'dot-prop';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { mapValidationErrors, ValidationErrors } from '../../Validation';
import { Step1, Step2, Step3, Step4, Step5 } from './step';
import { Steps } from './Steps';
// import { Footer } from './BaseStep';

interface Conversion {
    className?: string;
    onChange: (values: Values) => void;
}

// type Activities = 'repair' | 'replacement' | 'installation' | 'service';

export interface Values {
    zipcode: string;
    streetNumber: string;
    activities: string;
    spaces: string;
    externalUnitLocation: string;
    date: string;
}

const Validation = [
    Yup.object().shape({
        zipcode: Yup.string().required('is required'),
        streetNumber: Yup.string().required('field is required'),
    }),
    Yup.object().shape({
        activities: Yup.string().required('field is required'),
    }),
    Yup.object().shape({
        spaces: Yup.string().required('field is required'),
    }),
    Yup.object().shape({
        externalUnitLocation: Yup.string().required('field is required'),
    }),
    Yup.object().shape({
        date: Yup.string().required('field is required'),
    }),
];

const ValuesSchema = Yup.object({})
    .concat(Validation[0])
    .concat(Validation[1])
    .concat(Validation[2])
    .concat(Validation[3])
    .concat(Validation[4]);

interface Switch {
    children: JSX.Element | JSX.Element[];
    index?: number;
}

const Switch = ({ children, index = 0 }: Switch) => {
    const cp = React.Children.toArray(children)[index];
    return cp || <div />;
};

export const Conversion = styled(({ className, onChange }: Conversion) => {
    const defaultValues = {
        zipcode: '',
        streetNumber: '',
        activities: 'installation',
        spaces: '',
        externalUnitLocation: '',
        date: '',
    };
    const [currentStep, setStep] = React.useState<number>(0);
    const [values, setValues] = React.useState<Values>(defaultValues);
    const [errors, setErrors] = React.useState<ValidationErrors>(new Map());

    const onChangeHandler = async (field: string, value: string) => {
        const newValues = { ...values };
        dotProp.set(newValues, field, value);
        setValues(newValues);

        const result = await ValuesSchema.validateAt(field, newValues).catch(
            error => {
                return mapValidationErrors(error);
            }
        );

        if (result instanceof Map) {
            setErrors(new Map([...errors, ...result]));
        } else {
            const newErrors = new Map(errors);
            newErrors.delete(field);
            setErrors(newErrors);
        }
    };

    const validateStep = async (schema: Yup.ObjectSchema) => {
        const result = await schema.validate(values).catch(error => {
            return mapValidationErrors(error);
        });

        if (result instanceof Map) {
            setErrors(new Map([...errors, ...result]));
            return false;
        }

        return true;
    };

    const submit = async () => {
        const result = await ValuesSchema.validate(values, {
            abortEarly: false,
        }).catch(error => {
            const errorMap = mapValidationErrors(error);
            setErrors(errorMap);
            return error;
        });

        if (!(result instanceof Yup.ValidationError)) {
            onChange(values);
        }
    };

    // const onCancel = () => {
    //     setErrors(new Map());
    // };

    // const nextStep = async (currentIndex: number, nextIndex?: number) => {
    //     if (await validateStep(Validation[currentIndex])) {
    //         setStep(nextIndex || currentIndex + 1);
    //     }
    // };

    // const prevStep = (prevIndex: number) => {
    //     setStep(prevIndex);
    // };

    const next = async () => {
        if (await validateStep(Validation[currentStep])) {
            setStep(currentStep + 1);
        }
    };

    const prev = () => {
        setStep(currentStep - 1);
    };

    return (
        <div className={className}>
            <Steps submit={submit} next={next} prev={prev} index={currentStep}>
                <Step1
                    id="location"
                    onChange={onChangeHandler}
                    values={values}
                    errors={errors}
                />
                <Step2
                    id="activities"
                    onChange={onChangeHandler}
                    values={values}
                    errors={errors}
                />
                <Step3
                    id="properties"
                    onChange={onChangeHandler}
                    values={values}
                    errors={errors}
                />
                <Step4
                    id="external"
                    onChange={onChangeHandler}
                    values={values}
                    errors={errors}
                />
                <Step5
                    id="date"
                    onChange={onChangeHandler}
                    values={values}
                    errors={errors}
                />
            </Steps>
            {/* <ButtonGroup>
                <TextButton onClick={() => onCancel()}>cancel</TextButton>
                <Button type="primary" onClick={() => onSave()}>
                    Save
                </Button>
            </ButtonGroup> */}
        </div>
    );
})``;
