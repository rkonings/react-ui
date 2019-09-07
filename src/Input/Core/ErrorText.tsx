import styled from 'styled-components';

export interface ErrorText {
    errorText?: string;
}

export const ErrorText = styled.div`
    color: ${({theme}) => theme.input.error.color };
    font-size: 14px;
    padding-top: 4px;
`;
