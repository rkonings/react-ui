import React from 'react';
import styled from 'styled-components';

import { Title } from './';

interface Footer {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

export const FooterCol1 = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    font-size: 14px;
    line-height: 1.2em;
`;

export const FooterCol2 = styled.div`
    margin-right: 10em;
`;

export const FooterCol3 = styled.div`
    margin-right: 10em;
`;

export const FooterNav = styled.ul`
    padding: 0;
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
    padding: 10em 4em;
    align-items: flex-start;

    ${Title} {
        font-weight: 400;
        font-size: 24px;
    }

    ${({ theme: { color } }) => {
        return `
          background: ${color.black};
          color: ${color.white};
      `;
    }}
`;
