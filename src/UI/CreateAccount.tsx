import { Formik, FormikActions } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Button from '../Button/Button';
import { Grid, Item } from '../Grid';
import TextField from '../Input/TextField/TextField';

interface Values {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface CreateAccountProps {
    className?: string;
    onCreate?(values: Values): void;
}

const CreateAccountSchema = Yup.object().shape({
    email: Yup.string()
        .email('not an e-mail')
        .required('e-mail is required'),
    password: Yup.string()
        .min(6, 'password must have more than 6 chars')
        .max(50, 'password is too long')
        .required('password is required'),
    firstName: Yup.string().required('firstname is required'),
    lastName: Yup.string().required('lastname is required'),
    phone: Yup.string().required('phone is required'),
});

const CreateAccount = ({ className, onCreate }: CreateAccountProps) => {
    return (
        <div className={className}>
            <Formik
                validationSchema={CreateAccountSchema}
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                }}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikActions<Values>
                ) => {
                    setTimeout(() => {
                        if (onCreate) {
                            onCreate(values);
                        }
                        setSubmitting(false);
                    }, 2000);
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched,
                    handleBlur,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid width="400px" spacing={20}>
                            <Item width="100%">
                                <TextField
                                    name={'firstName'}
                                    helperText={'enter your firstname'}
                                    errorText={
                                        touched.firstName
                                            ? errors.firstName
                                            : undefined
                                    }
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeHolder={'firstname'}
                                    width="100%"
                                />
                            </Item>
                            <Item width="100%">
                                <TextField
                                    name={'lastName'}
                                    helperText={'enter your lastname'}
                                    errorText={
                                        touched.lastName
                                            ? errors.lastName
                                            : undefined
                                    }
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeHolder={'lastname'}
                                    width="100%"
                                />
                            </Item>
                            <Item width="100%">
                                <TextField
                                    name={'phone'}
                                    helperText={'enter your phone number'}
                                    errorText={
                                        touched.phone ? errors.phone : undefined
                                    }
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeHolder={'phone number'}
                                    width="100%"
                                />
                            </Item>
                            <Item width="100%">
                                <TextField
                                    name={'email'}
                                    helperText={'enter your e-mail'}
                                    errorText={
                                        touched.email ? errors.email : undefined
                                    }
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeHolder={'e-mail'}
                                    width="100%"
                                />
                            </Item>
                            <Item width="100%">
                                <TextField
                                    name={'password'}
                                    helperText={'use a strong password'}
                                    errorText={
                                        touched.password
                                            ? errors.password
                                            : undefined
                                    }
                                    value={values.password}
                                    placeHolder={'password'}
                                    inputType={'password'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    width="100%"
                                />
                            </Item>
                            <Item width="100%">
                                <Button
                                    isLoading={isSubmitting}
                                    inputType={'submit'}
                                    type={'primary'}
                                >
                                    Create
                                </Button>
                            </Item>
                        </Grid>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const StyledCreateAccount = styled(CreateAccount)``;

export default StyledCreateAccount;
