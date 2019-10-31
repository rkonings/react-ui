import React from 'react';
import styled from 'styled-components';

interface Navigation {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

interface NavigationItem {
    isActive?: boolean;
    className?: string;
    children: string;
    icon?: JSX.Element;
    onClick?: (event: React.MouseEvent) => void;
}

export const NavigationItem = styled(({children, className, onClick, icon}: NavigationItem) => {
    return (
        <a onClick={onClick} className={className}>{icon}{children}</a>
    );
})`
    padding: 0 1em;
    height: 40px;
    color: ${({theme: { menu: { item } }}) => item.default.color };
    display: flex;
    cursor: pointer;
    font-size: 14px;
    align-items: center;

    svg {
        margin-right: 1em;
        height: 1.2em
        width: 1.2em;
        opacity: 0.8;
    }

    ${({theme: { color, menu : { item }}, isActive}) => {
        if (isActive) {
            return `
                background: ${item.active.backgroundColor};
                color: ${item.active.color};
                svg {
                    fill: ${color.white};
                    opacity: 1;
                }

                path {
                    fill: ${color.white};
                }
            `;
        }
        return;

    }};

    &:hover {

        ${({theme: { color,  menu: {item: { hover}} }}) => {
            return `
                svg {
                    fill: ${color.white};
                    opacity: 1;
                }
                path {
                    fill: ${color.white};
                }
                background: ${hover.backgroundColor};
                color: ${hover.color};
            `;
        } }
    }
`;

const Navigation = ({className, children}: Navigation) => {
    return (
        <div className={className}>{children}</div>
    );
};

export default styled(Navigation)`
    ${({theme: { menu}}) => {
        return `
            background: ${menu.backgroundColor};
        `;
    }}

    display:flex;
    flex-direction: column;
    width: 200px;
`;
