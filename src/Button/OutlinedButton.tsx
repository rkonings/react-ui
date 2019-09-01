import * as React from 'react';
import styled from 'styled-components';
import { Button, ButtonBaseStyle, ButtonProps, ButtonStyleHover, ButtonStyleLoading } from './Button';

const ButtonColorStyle = ({active, theme, type = 'default'}: ButtonProps) => {
    const style = theme.button[type];
    const state = active ? 'active' : 'default';
    const color = style[state].outlined;
    return `
        border: 1px solid ${color};
        background: none;
        color: ${color}
    `;
};

const ButtonStyleIcon = ({ theme, type = 'default' }: ButtonProps) => {
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

const OutlinedButton = (props: ButtonProps) => (
    <Button {...props} variant="Outlined" />
);

export default styled(OutlinedButton)`
    ${ButtonBaseStyle};
    ${ButtonColorStyle};
    ${ButtonStyleHover};
    ${ButtonStyleIcon};
    ${ButtonStyleLoading};
`;
