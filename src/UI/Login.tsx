import * as React from 'react';

import { Formik, FormikActions } from 'formik';

import styled from 'styled-components';
import Button from '../Button/Button';
import TextField from '../Input/TextField/TextField';

interface LoginProps {
    className?: string;
    onLogin?(email: string, password: string): void;
}

interface Values {
    password: string;
    email: string;
}

const Login = ({className, onLogin}: LoginProps) => {
    return (
        <div className={className}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
                    setTimeout(() => {
                      console.log(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 500);
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name={'email'}
                            error={errors.email}
                            value={values.email}
                            onChange={handleChange}
                            placeHolder={'e-mail'}
                        />
                        <TextField
                            name={'password'}
                            error={errors.password}
                            value={values.password}
                            placeHolder={'password'}
                            inputType={'password'}
                            onChange={handleChange}
                        />
                        <Button inputType={'submit'} type={'primary'}>Login</Button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

/*
 <TextField
                value={email}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                placeHolder={'e-mail'}
            />
            <TextField
                placeHolder={'password'}
                inputType={'password'}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
            />
            <Button onClick={onClick} type={'primary'}>Login</Button>
            */

const StyledLogin = styled(Login)`
    ${TextField} {
        margin-bottom: 10px;
    }
`;

export default StyledLogin;
