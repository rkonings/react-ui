import * as React from 'react';
import styled from 'styled-components';
import { BaseButton } from './BaseButton';
import { Button, ButtonStyleHover } from './Button';

const ButtonColorStyle = ({ active, theme, type = 'default' }: BaseButton) => {
    const style = theme.button[type];
    const state = active ? 'active' : 'default';
    const color = style[state].outlined;
    return `
        color: ${color}
    `;
};

const ButtonStyleIcon = ({ theme, type = 'default' }: BaseButton) => {
    const style = theme.button[type];
    const color = style.default.outlined;

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

const TextButton = (props: BaseButton) => (
    <Button {...props} variant="Outlined" />
);

export default styled(TextButton)`
    background: none;
    border: none;
    ${ButtonColorStyle};
    ${ButtonStyleHover};
    ${ButtonStyleIcon};
`;
