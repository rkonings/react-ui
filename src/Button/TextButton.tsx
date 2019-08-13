import styled from 'styled-components';
import { Button, ButtonBaseStyle, ButtonProps, ButtonStyleHover } from './Button';

const ButtonColorStyle = ({active, theme, type = 'default'}: ButtonProps) => {
    const style = theme.button[type];
    const state = active ? 'active' : 'default';
    const color = style[state].outlined;
    return `
        color: ${color}
    `;
};

const ButtonStyleIcon = ({ theme, type = 'default' }: ButtonProps) => {
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

export default styled(Button)`
    background: none;
    border: none;
    ${ButtonBaseStyle};
    ${ButtonColorStyle};
    ${ButtonStyleHover};
    ${ButtonStyleIcon};
`;
