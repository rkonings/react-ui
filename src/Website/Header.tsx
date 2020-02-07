import React from 'react';
import styled from 'styled-components';
import { device } from '../Device';

interface Header {
    className?: string;
    logo: JSX.Element | string;
    children: JSX.Element;
}

const Logo = styled.div`
    box-sizing: border-box;
    font-weight: bold;
    padding: 2em;
    font-size: 20px;

    @media ${device.tablet} {
        padding: 1em;
        font-size: 16px;
    }
`;

const Navigation = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    padding: 0 2em;

    @media ${device.tablet} {
        display: none;
    }
`;

export const Header = styled(({ className, logo, children }: Header) => {
    return (
        <div className={className}>
            <Logo>{logo}</Logo>
            <Navigation>{children}</Navigation>
        </div>
    );
})`
    display: flex;
    width: 100%;
    height: 100px;

    flex-direction: row;
    justify-content: center;
    background: ${({ theme: { color } }) => color.white};

    @media ${device.tablet} {
        height: 50px;
    }
`;
