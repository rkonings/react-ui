import React from 'react';
import styled, { keyframes } from 'styled-components';

import { device } from '../Device';
import { Bars, Close } from '../Icon';

interface MainNavItem {
    className?: string;
    children: string | JSX.Element;
    url: string;
    title?: string;
    active?: boolean;
}

const fade = keyframes`
    from {
        opacity: 0;
        transform: translateY(100%)
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

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
        color: ${({ theme: { color } }) => color.gray100};
        text-decoration: none;
        padding: 1em;
        font-size: 18px;
        position: relative;

        &::after {
            content: ' ';
            position: absolute;
            bottom: 0.5em;
            left: 1em;
            width: 0;
            height: 1px;
            background: ${({ theme: { color } }) => color.gray80};
            opacity: 0;
            display: block;
            transition: all 0.5s ease-in-out;
        }

        &:hover {
            color: ${({ theme: { color } }) => color.gray110};
            &::after {
                width: 50%;
                opacity: 1;
            }
        }
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

interface TopNavigation {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

export const TopNavigation = styled(
    ({ className, children }: TopNavigation) => {
        return <div className={className}>{children}</div>;
    }
)`
    display: flex;
    flex-direction: row;

    ${MainNavItem} {
        a {
            font-size: 16px;
            font-weight: 200;
            color: ${({ theme: { color } }) => color.gray120};
        }
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

    animation: ${fade} 0.3s ease-in;

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
            display: flex;
            width: fit-content;
            padding: 0.5em 0;
            position: relative;
            ${({ theme: { color } }) => {
                return `
                  color: ${color.white};
              `;
            }}

            &::after {
                content: ' ';
                position: absolute;
                bottom: 0em;
                left: 0;
                width: 0;
                height: 1px;
                background: ${({ theme: { color } }) => color.white};
                opacity: 0;
                display: block;
                transition: all 0.5s ease-in-out;
            }

            &:hover {
                &::after {
                    width: 75%;
                    opacity: 1;
                }
            }
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
