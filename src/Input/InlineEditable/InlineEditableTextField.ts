import styled from 'styled-components';
import { Label } from '../';
import TextField from '../TextField/TextField';

export const InlineEditableTextField = styled(TextField)`
    input {
        padding: 0.5em 1em 0.5em 0;
    }

    label {
        border-bottom-color: rgba(0, 0, 0, 0);
    }

    ${Label} {
        font-weight: 300;
        ${({ theme: { color } }) => color.gray60};
        font-size: 80%;
    }
`;
