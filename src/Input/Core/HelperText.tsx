import styled from 'styled-components';

export interface HelperText {
    helperText?: string;
}

export const HelperText = styled.div`
    color: ${({ theme }) => theme.input.helper.color};
    font-size: 14px;
    padding-top: 4px;
`;
