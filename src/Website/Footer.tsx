import React from 'react';
import styled from 'styled-components';

import { device } from '../Device';
import { Title } from './';

interface Footer {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

export const FooterCol1 = styled.div`
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    flex-direction: column;
    font-size: 14px;
    line-height: 1.2em;

    @media ${device.tablet} {
        width: 100%;
        padding: 1em;
    }
`;

export const FooterCol2 = styled.div`
    margin-right: 4em;
    @media ${device.tablet} {
        width: 100%;
        padding: 1em;
    }
`;

export const FooterCol3 = styled.div`
    margin-right: 1em;
    @media ${device.tablet} {
        width: 100%;
        padding: 1em;
    }
`;

export const FooterNav = styled.ul`
    padding: 0;
    margin: 0;
`;

interface FooterNavItem {
    className?: string;
    children: string | JSX.Element;
    url: string;
    title?: string;
    active?: boolean;
}

export const FooterNavItem = styled(
    ({ className, children, title, url }: FooterNavItem) => {
        return (
            <li className={className}>
                <a href={url} title={title}>
                    {children}
                </a>
            </li>
        );
    }
)`
    list-style: none;
    margin: 0;

    @media ${device.tablet} {
        font-size: 14px;
    }

    a {
        color: ${({ theme: { color } }) => color.white};
        text-decoration: none;
    }
`;

export const Footer = styled(({ className, children }: Footer) => {
    return <div className={className}>{children}</div>;
})`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 6em 4em;
    align-items: flex-start;

    ${Title} {
        font-weight: 400;
        font-size: 24px;

        @media ${device.tablet} {
            font-size: 18px;
            margin-bottom: 0.5em;
        }
    }

    ${({ theme: { color } }) => {
        return `
          background: ${color.black};
          color: ${color.white};
      `;
    }}

    @media ${device.tablet} {
        flex-direction: column;
        padding: 2em 2em;
    }
`;
