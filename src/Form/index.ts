import styled from 'styled-components';
import TextField from '../Input/TextField/TextField';

export const InputField = styled.div`
    padding-bottom: 2em;

    ${TextField} {
        input {
            background: none;
        }
    }
`;
