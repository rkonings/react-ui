import React from 'react';
import styled from 'styled-components';

interface Header {
    className?: string;
    logo: JSX.Element | string;
    children: JSX.Element;
}

const Logo = styled.div`
    box-sizing: border-box;
    padding: 2em;
    font-size: 20px;
    font-weight: bold;
`;

const Navigation = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    padding: 0 2em;
`;

export const Header = styled(({ className, logo, children }: Header) => {
    return (
        <div className={className}>
            <Logo>{logo}</Logo>
            <Navigation>{children}</Navigation>
        </div>
    );
})`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    background: ${({ theme: { color } }) => color.white};
`;
