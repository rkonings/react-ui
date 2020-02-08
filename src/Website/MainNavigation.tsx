import React from 'react';
import styled from 'styled-components';

import { device } from '../Device';
import { Bars, Close } from '../Icon';

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

interface NavigationToggle {
    className?: string;
    onClick: () => void;
    open: boolean;
}

export const NavigationToggle = styled(
    ({ className, onClick, open }: NavigationToggle) => {
        return (
            <div onClick={onClick} className={className}>
                {open ? <Close /> : <Bars />}
            </div>
        );
    }
)`
    display: none;
    padding: 1em;
    align-self: center;

    ${Close}, ${Bars} {
        width: 20px;
        height: 20px;
    }

    @media ${device.tablet} {
        display: block;
    }
`;

interface MobileNavigation {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

export const MobileNavigation = styled(
    ({ className, children }: MobileNavigation) => {
        return (
            <div className={className}>
                <ul>{children}</ul>
            </div>
        );
    }
)`
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 80px;
    left: 0;
    background: #ffffff;
    padding: 2em;
    z-index: 9999;

    ul {
        display: flex;
        flex-direction: column;
    }

    ${({ theme: { color } }) => {
        return `
          background: ${color.black};
          color: ${color.white};
      `;
    }}

    ${MainNavItem} {
        a {
            font-size: 22px;
            font-weight: 300;
            display: block;
            padding: 0.5em 0;
            ${({ theme: { color } }) => {
                return `
                  color: ${color.white};
              `;
            }}
        }
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

    @media ${device.tablet} {
        display: none;
    }
`;
