import * as React from 'react';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import Theme, { Size as ButtonSize } from '../interfaces/Theme';
import Loader from '../Loader/Loader';

export type ButtonType = 'default' | 'primary' | 'secondairy' | 'light';
export type ButtonShape = 'DEFAULT' | 'ROUNDED' | 'CIRCLE';
export type ButtonVariant = 'outlined' | 'text' | 'default';
export interface BaseButton {
  children: string | JSX.Element | Array<string | JSX.Element>;
  inputType?: 'button' | 'reset' | 'submit';
  type?: ButtonType;
  shape?: ButtonShape;
  variant?: 'Text' | 'Outlined';
  className?: string;
  theme: Theme;
  isIcon?: boolean;
  size?: ButtonSize;
  active?: boolean;
  width?: number | string;
  contentAlignment?: string;
  isLoading?: boolean;
  onClick?(event: React.MouseEvent): void;
}

export const InnerText = styled.span`
  position: relative;
  z-index: 1;
`;

export const ButtonBaseStyle = ({isIcon = false, theme, size = 'm',
contentAlignment = 'center', width}: BaseButton) => {
    const fontSize = theme.button.size[size];
    const height = fontSize * 3;

    let buttonWidth = 'width: auto;';
    if (typeof width === 'number') {
        buttonWidth = `width: ${width}px`;
    } else if (typeof width === 'string') {
        buttonWidth = `width: ${width}`;
    }

    let innerTextCSS = `
        margin-left: 1em;
        margin-right: 1em;
        display: flex;
        align-items: center;
    `;

    if (isIcon) {
        innerTextCSS = `
            width ${height - 10}px;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
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
        cursor: pointer;
        position: relative;
        transition: color 0.1s linear 0.1s;
        text-transform: uppercase;
        height: ${height}px;
        position: relative;

        ${InnerText} {
            ${innerTextCSS}
        }


        ${Loader} {
            position: absolute;

        }

        &:focus{
            outline: none;
        }
    `;
};

export const ButtonStyleLoading = ({isLoading}: BaseButton) => {
    if (isLoading) {
        return `
            ${InnerText} {
                opacity: 0;
            }
        `;
    }
    return null;
};

export const ButtonShapeStyle = ({theme, size = 'm', shape = 'DEFAULT'  }: BaseButton) => {
    switch (shape) {
        case 'CIRCLE':
            const fontSize = theme.button.size[size];
            const width = fontSize * 3;
            return `
                border-radius: 50%;
                width: ${width}px;
            `;
        break;
        default:
        case 'DEFAULT':
            return 'border-radius: 0;';
        break;
    }
};

export const BaseButton = styled(({children, className, onClick, variant,
    inputType = 'button', isLoading, type = 'default' }: BaseButton) => {
        const theme = useTheme();
        const style = theme.button[type];
        let color = style.default.text;
        if (variant === 'Outlined') {
            color = style.default.outlined;
        }
    return (
        <button className={className} type={inputType} onClick={onClick}>
            <InnerText>{children}</InnerText>
            {isLoading && <Loader color={color} size={15} />}
        </button>
    );
})`
    ${ButtonBaseStyle};
    ${ButtonShapeStyle};
    ${ButtonStyleLoading};
`;
