import { Formik, FormikActions } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Button from '../Button/Button';
import TextField from '../Input/TextField/TextField';

interface Values {
    password: string;
    email: string;
}

interface LoginProps {
    className?: string;
    onLogin?(values: Values): void;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('not an e-mail')
        .required('e-mail is required'),
    password: Yup.string()
        .min(6, 'password must have more than 6 chars')
        .max(50, 'password is too long')
        .required('password is required')
  });

const Login = ({className, onLogin}: LoginProps) => {
    return (
        <div className={className}>
            <Formik
                validationSchema={LoginSchema}
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
                    setTimeout(() => {
                        if (onLogin) {
                            onLogin(values);
                        }
                      setSubmitting(false);
                    }, 100);
                }}
            >
                {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name={'email'}
                            helperText={'enter your e-mail'}
                            error={touched.email ? errors.email : undefined}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeHolder={'e-mail'}
                        />
                        <TextField
                            name={'password'}
                            helperText={'use a strong password'}
                            error={touched.password ? errors.password : undefined}
                            value={values.password}
                            placeHolder={'password'}
                            inputType={'password'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Button inputType={'submit'} type={'primary'}>Login</Button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

const StyledLogin = styled(Login)`
    ${TextField} {
        margin-bottom: 10px;
    }
`;

export default StyledLogin;
