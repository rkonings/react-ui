import { Formik, FormikActions } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Button from '../Button/Button';
import TextButton from '../Button/TextButton';
import CheckBox from '../Input/Checkbox/Checkbox';
import TextField from '../Input/TextField/TextField';

interface Values {
    password: string;
    email: string;
    remember?: boolean;
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
                    password: '',
                    remember: false
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
                            error={touched.email ? errors.email : undefined}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeHolder={'e-mail'}
                        />
                        <TextField
                            name={'password'}
                            error={touched.password ? errors.password : undefined}
                            value={values.password}
                            placeHolder={'password'}
                            inputType={'password'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <CheckBox
                            label={'remember me'}
                            name={'remember'}
                            checked={values.remember}
                            onChange={handleChange}
                        />
                        <Button width={150} inputType={'submit'} type={'primary'}>Login</Button>
                        <TextButton>or create account</TextButton>
                    </form>
                )}
            </Formik>

        </div>
    );
};

const StyledLogin = styled(Login)`
    ${TextField}, ${CheckBox} {
        margin-bottom: 20px;
    }
`;
export default StyledLogin;
