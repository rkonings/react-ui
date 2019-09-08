import * as React from 'react';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import Theme, { Size as ButtonSize } from '../interfaces/Theme';
import Loader from '../Loader/Loader';

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

export type ButtonType = 'default' | 'primary' | 'secondairy';

export interface ButtonProps {
  children: string | JSX.Element | Array<string | JSX.Element>;
  inputType?: 'button' | 'reset' | 'submit';
  type?: ButtonType;
  variant?: 'Text' | 'Outlined';
  className?: string;
  theme: Theme;
  size?: ButtonSize;
  active?: boolean;
  width?: number | string;
  contentAlignment?: string;
  isLoading?: boolean;
  onClick?(event: React.MouseEvent): void;
}

export const Button = ({children, className, onClick, variant,
    inputType = 'button', isLoading, type = 'default' }: ButtonProps): JSX.Element => {

    const theme = useTheme();
    const style = theme.button[type];
    let color = style.default.text;
    if (variant === 'Outlined') {
        color = style.default.outlined;
    }
    return (
        <button className={className} type={inputType} onClick={onClick}>
            <ButtonText>{children}</ButtonText>
            {isLoading && <Loader color={color} size={15} />}
        </button>
    );
};

const ButtonColorStyle = ({active, theme, type = 'default'}: ButtonProps) => {
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

export const ButtonBaseStyle = ({theme, size = 'm', contentAlignment = 'center', width}: ButtonProps) => {
    const fontSize = theme.button.size[size];
    const height = fontSize * 3;

    let buttonWidth = 'width: auto;';
    if (typeof width === 'number') {
        buttonWidth = `width: ${width}px`;
    } else if (typeof width === 'string') {
        buttonWidth = `width: ${width}`;
    }

    return `
        ${theme.align(contentAlignment)}
        font-family: ${theme.fontFamily};
        font-weight: ${theme.button.fontWeight};
        ${buttonWidth}
        display: flex;
        font-size: ${fontSize}px;
        overflow: hidden;
        align-items: center;
        border-radius: 0;
        cursor: pointer;
        position: relative;
        transition: color 0.1s linear 0.1s;
        text-transform: uppercase;
        height: ${height}px;
        position: relative;


        ${ButtonText} {
            margin-left: 1em;
            margin-right: 1em;
            display: flex;
            align-items: center;

        }

        ${Loader} {
            position: absolute;

        }

        &:focus{
            outline: none;
        }
    `;
};

export const ButtonStyleHover = ({ theme, type = 'default', isLoading }: ButtonProps) => {
    if (isLoading) { return; }
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

export const ButtonStyleLoading = ({isLoading}: ButtonProps) => {
    if (isLoading) {
        return `
            ${ButtonText} {
                opacity: 0;
            }
        `;
    }
    return null;
};

/* Button hover effects: https://codepen.io/ritchiejacobs/pen/qEJjBM */
const StyledButton = styled(Button)`
    ${ButtonBaseStyle}
    ${ButtonColorStyle};
    ${ButtonStyleHover};
    ${ButtonStyleIcon}}

    ${ButtonStyleLoading};
`;

export default StyledButton;
