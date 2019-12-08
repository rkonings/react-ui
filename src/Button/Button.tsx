import * as React from 'react';
import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const Button = (props: BaseButton): JSX.Element => {
    return <BaseButton {...props} />;
};

const ButtonColorStyle = ({ active, theme, type = 'default' }: BaseButton) => {
    const style = theme.button[type];
    const state = active ? 'active' : 'default';
    const color = style[state].text;
    const background = style[state].main;
    return `
        border: none;
        background: ${background};
        color: ${color}
    `;
};

export const ButtonStyleHover = ({
    theme,
    type = 'default',
    isLoading,
}: BaseButton) => {
    if (isLoading) {
        return;
    }
    const style = theme.button[type];
    const color = style.hover.text;
    const background = style.hover.main;

    return `
        &:hover{
            color: ${color};
            svg {
                stroke: ${color};
                fill: ${color};
            }
        }
        &::after {
            transition: all 0.1s;
            height: 100%;
            left: -35%;
            top: 0;
            transform: skew(30deg);
            transition-duration: 0.2s;
            transform-origin: top left;
            width: 0;
        }

        &::before,
        &::after {
            background: ${background};
            content: '';
            position: absolute;
            z-index: 0;
        }

        &:hover::after {
            height: 100%;
            width: 135%;
        }
    `;
};

const ButtonStyleIcon = ({ theme, type = 'default' }: BaseButton) => {
    const style = theme.button[type];
    const color = style.default.text;

    return `
        svg {
            transition: all 0.1s linear 0.1s;
            height: 1.2em;
            width: 1.2em;
            stroke: ${color};
            fill: ${color};
        }
    `;
};

/* Button hover effects: https://codepen.io/ritchiejacobs/pen/qEJjBM */
const StyledButton = styled(Button)`
    ${ButtonColorStyle};
    ${ButtonStyleHover};
    ${ButtonStyleIcon};
`;

export default StyledButton;
