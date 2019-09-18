import * as React from 'react';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import Theme, { Size as ButtonSize } from '../interfaces/Theme';
import Loader from '../Loader/Loader';

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

export const ButtonBaseStyle = ({theme, size = 'm', contentAlignment = 'center', width}: BaseButton) => {
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

export const ButtonStyleLoading = ({isLoading}: BaseButton) => {
    if (isLoading) {
        return `
            ${ButtonText} {
                opacity: 0;
            }
        `;
    }
    return null;
};

export const ButtonShapeStyle = ({shape = 'DEFAULT'  }: BaseButton) => {
    switch (shape) {
        case 'CIRCLE':
            return 'border-radius: 50%;';
        break;
        default:
        case 'DEFAULT':
            return 'border-radius: 0;';
        break;
    }
};

export type ButtonType = 'default' | 'primary' | 'secondairy';
export type ButtonShape = 'DEFAULT' | 'ROUNDED' | 'CIRCLE';
export interface BaseButton {
  children: string | JSX.Element | Array<string | JSX.Element>;
  inputType?: 'button' | 'reset' | 'submit';
  type?: ButtonType;
  shape?: ButtonShape;
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
            <ButtonText>{children}</ButtonText>
            {isLoading && <Loader color={color} size={15} />}
        </button>
    );
})`
    ${ButtonBaseStyle};
    ${ButtonShapeStyle};
    ${ButtonStyleLoading};
`;
