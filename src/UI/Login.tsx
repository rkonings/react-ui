import * as React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import TextField from '../Input/TextField/TextField';

interface LoginProps {
    className?: string;
    onLogin?(email: string, password: string): void;
}

const Login = ({className, onLogin}: LoginProps) => {

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const onClick = () => {
        if (onLogin) {
            onLogin(email, password);
        }
    };

    return (
        <div className={className}>
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
        </div>
    );
};

const StyledLogin = styled(Login)`
    ${TextField} {
        margin-bottom: 10px;
    }
`;

export default StyledLogin;
