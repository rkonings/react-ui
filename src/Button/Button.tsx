import * as React from 'react';
import styled from 'styled-components';
import Theme from '../interfaces/Theme';

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

type ButtonType = 'default' | 'primary' | 'secondairy';

interface ButtonProps {
  children: string | JSX.Element | Array<string | JSX.Element>;
  type?: ButtonType;
  outline?: boolean;
  className?: string;
  theme: Theme;
  onClick?(event: React.MouseEvent): void;
}

const Button = ({ children, className, onClick }: ButtonProps): JSX.Element => {
  return (
    <button className={className} type={`button`} onClick={onClick}>
      <ButtonText>{children}</ButtonText>
    </button>
  );
};

const ButtonStyle = ({ theme, type = 'default', outline }: ButtonProps) => {
    const style = theme.button[type];
    const background = outline ? 'none' : style.default.background;
    const color = outline ? style.default.outlineColor : style.default.color;
    const border = outline ? `1px solid ${color} ` : 'none';

    return `
        font-family: ${theme.fontFamily};
        font-weight: ${theme.button.fontWeight};
        background: ${background};
        color: ${color};
        display: flex;
        font-size: 14px;
        overflow: hidden;
        align-items: center;
        border-radius: 0;
        border: ${border};
        cursor: pointer;
        position: relative;
        transition: color 0.1s linear 0.1s;
        text-transform: uppercase;
        height: 50px;

        ${ButtonText} {
            margin-left: 1em;
            margin-right: 1em;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:focus{
            outline: none;
        }
    `;
};

const ButtonStyleHover = ({ theme, type = 'default', outline }: ButtonProps) => {
    const style = theme.button[type];
    const color = outline ? style.hover.outlineColor : style.hover.color;
    const background = outline ? style.hover.outlineBackground : style.hover.background;
    const border = outline ? `1px solid  ${color};` : 'none';

    return `
        &:hover{
            color: ${color};
            border: ${border};
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

const ButtonStyleIcon = ({ theme, type = 'default', outline }: ButtonProps) => {
    const style = theme.button[type];
    const color = outline ? style.default.outlineColor : style.default.color;

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
    ${ButtonStyle};
    ${ButtonStyleHover};
    ${ButtonStyleIcon};
`;

export default StyledButton;
