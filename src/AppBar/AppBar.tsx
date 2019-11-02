import * as React from 'react';
import styled from 'styled-components';

export const AppBarTitle = styled.h6`
    display:flex;
    flex-grow: 1;
    font-size: 14px;
    font-weight: 400;
`;

interface AppBar {
    className?: string;
    children: JSX.Element | JSX.Element[];
    fixed?: boolean;
}

const AppBar = styled(({className, children}: AppBar) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
})`

    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

    ${({fixed}) => {
        if (fixed) {
            return `
                position: fixed;
                top: 0;
                left:0;
            `;
        }
        return '';
    }}

    ${({theme: { color }}) => {
        return `
            background: ${color.gray120};
            color: ${color.white};
        `;
    }};

`;

export default AppBar;
