import React from 'react';
import styled from 'styled-components';

interface MainNavItem {
    className?: string;
    children: string | JSX.Element;
    url: string;
    title?: string;
    active?: boolean;
}

export const MainNavItem = styled(
    ({ className, children, title, url }: MainNavItem) => {
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
        color: ${({ theme: { color } }) => color.gray80};
        text-decoration: none;
        padding: 1em;
    }
`;

interface MainNavigation {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

export const MainNavigation = styled(
    ({ className, children }: MainNavigation) => {
        return <ul className={className}>{children}</ul>;
    }
)`
    display: flex;
    flex-direction: row;
`;
