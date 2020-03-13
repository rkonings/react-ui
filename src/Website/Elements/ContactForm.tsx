import dotProp from 'dot-prop';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { InputField } from '../../Form';
import TextArea from '../../Input/TextArea/';
import TextField from '../../Input/TextField/TextField';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import Button from '../../Button/Button';

import { mapValidationErrors, ValidationErrors } from '../../Validation';

const Validation = Yup.object().shape({
    name: Yup.string().required('is required'),
    email: Yup.string().required('field is required'),
    phone: Yup.string(),
    city: Yup.string(),
    question: Yup.string(),
});

export interface Values {
    name: string;
    email: string;
    phone: string;
    city: string;
    question: string;
}

interface ContactForm {
    className?: string;
    onSubmit: (values: Values) => void;
}

export const ContactForm = styled(({ className, onSubmit }: ContactForm) => {
    const defaultValues = {
        name: '',
        email: '',
        phone: '',
        city: '',
        question: '',
    };

    const [values, setValues] = React.useState<Values>(defaultValues);
    const [errors, setErrors] = React.useState<ValidationErrors>(new Map());

    const onChangeHandler = async (field: string, value: string) => {
        const newValues = { ...values };
        dotProp.set(newValues, field, value);
        setValues(newValues);

        const result = await Validation.validateAt(field, newValues).catch(
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

    const submit = async () => {
        const result = await Validation.validate(values, {
            abortEarly: false,
        }).catch(error => {
            const errorMap = mapValidationErrors(error);
            setErrors(errorMap);
            return error;
        });

        if (!(result instanceof Yup.ValidationError)) {
            onSubmit(values);
        }
    };

    return (
        <div className={className}>
            <InputField>
                <TextField
                    value={values.name}
                    width="100%"
                    placeHolder="Naam"
                    onChange={e =>
                        onChangeHandler('name', e.currentTarget.value)
                    }
                    errorText={errors.get('name')}
                />
                <TextField
                    value={values.email}
                    width="100%"
                    placeHolder="E-mailadres"
                    onChange={e =>
                        onChangeHandler('email', e.currentTarget.value)
                    }
                    errorText={errors.get('email')}
                />
                <TextField
                    value={values.phone}
                    width="100%"
                    placeHolder="Telefoonnummer"
                    onChange={e =>
                        onChangeHandler('phone', e.currentTarget.value)
                    }
                    errorText={errors.get('phone')}
                />
                <TextField
                    value={values.city}
                    width="100%"
                    placeHolder="Woonplaats"
                    onChange={e =>
                        onChangeHandler('city', e.currentTarget.value)
                    }
                    errorText={errors.get('city')}
                />
                <TextArea
                    value={values.question}
                    width="100%"
                    height="200px"
                    placeHolder="Omschrijf hier uw vraag of opmerking"
                    onChange={e =>
                        onChangeHandler('question', e.currentTarget.value)
                    }
                    errorText={errors.get('question')}
                />
            </InputField>
            <ButtonGroup>
                <Button type="primary" onClick={() => submit()}>
                    Verstuur
                </Button>
            </ButtonGroup>
        </div>
    );
})`
    max-width: 500px;
    min-width: 300px;
    width: 100%;
`;
