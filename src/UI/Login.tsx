import { Formik, FormikActions } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Button from '../Button/Button';
import TextButton from '../Button/TextButton';
import { Grid, Item } from '../Grid';
import CheckBox from '../Input/Checkbox/Checkbox';
import Switch from '../Input/Switch/Switch';
import TextField from '../Input/TextField/TextField';

export interface LoginValues {
    password: string;
    email: string;
    remember?: boolean;
}

interface LoginProps {
    className?: string;
    onLogin?(values: LoginValues): void;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('not an e-mail')
        .required('e-mail is required'),
    password: Yup.string()
        .min(6, 'password must have more than 6 chars')
        .max(50, 'password is too long')
        .required('password is required'),
});

const Login = ({ className, onLogin }: LoginProps) => {
    return (
        <div className={className}>
            <Formik
                validationSchema={LoginSchema}
                initialValues={{
                    email: '',
                    password: '',
                    remember: false,
                }}
                onSubmit={(
                    values: LoginValues,
                    { setSubmitting }: FormikActions<LoginValues>
                ) => {
                    setTimeout(() => {
                        if (onLogin) {
                            onLogin(values);
                        }
                        setSubmitting(false);
                    }, 100);
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched,
                    handleBlur,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid width="400px" type="row" spacing={20}>
                            <Item width="100%">
                                <TextField
                                    name={'email'}
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
                                <CheckBox
                                    label={'remember me'}
                                    name={'remember'}
                                    checked={values.remember}
                                    onChange={handleChange}
                                />
                            </Item>
                            <Item width="100%">
                                <Switch
                                    label="remember me"
                                    name={'remember'}
                                    checked={values.remember}
                                    onChange={handleChange}
                                />
                            </Item>
                            <Item width="50%">
                                <Button
                                    width="100%"
                                    inputType={'submit'}
                                    type={'primary'}
                                >
                                    Login
                                </Button>
                            </Item>
                            <Item width="50%">
                                <TextButton width="100%">
                                    or create account
                                </TextButton>
                            </Item>
                        </Grid>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const StyledLogin = styled(Login)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default StyledLogin;
