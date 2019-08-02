import * as React from 'react';
import styled from 'styled-components';

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

type ButtonType = 'default' | 'primary' | 'secondairy';

interface ButtonProps {
  children: string | JSX.Element | Array<string | JSX.Element>;
  type?: ButtonType;
  className?: string;
  onClick?(event: React.MouseEvent): void;
}

const Button = ({ children, className, onClick }: ButtonProps): JSX.Element => {
  return (
    <button className={className} type={`button`} onClick={onClick}>
      <ButtonText>{children}</ButtonText>
    </button>
  );
};

/* Button hover effects: https://codepen.io/ritchiejacobs/pen/qEJjBM */
export const FilledButton = styled(Button)`
  ${({ theme, type = 'default' }): string => {
    const style = theme.button[type];
    return `
            font-family: ${theme.fontFamily};
            font-weight: ${theme.button.fontWeight};
            background: ${style.default.background};
            color: ${style.default.color};
            display: flex;
            font-size: 14px;
            overflow: hidden;
            align-items: center;
            border-radius: 0;
            border: none;
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

            svg {
                transition: all 0.1s linear 0.1s;
                height: 1.2em;
                width: 1.2em;
                stroke: ${style.default.color};
                fill: ${style.default.color};
            }

            &:focus{
                outline: none;
            }

            &:hover{
                color: ${style.default.color};
                svg {
                    stroke: ${style.default.color};
                    fill: ${style.default.color};
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
                background: ${style.hover.background};
                content: '';
                position: absolute;
                z-index: 0;
            }

            &:hover::after {
                height: 100%;
                width: 135%;
            }
        `;
  }}
`;

export const GhostButton = styled(Button)`
  ${({ theme, type = 'default' }) => {
    const style = theme.button[type];
    return `
      font-family: ${theme.fontFamily};
      font-weight: ${theme.button.fontWeight};
      border: 1px solid  ${style.default.ghostColor};
      color: ${style.default.ghostColor};
      display: flex;
      font-size: 14px;
      overflow: hidden;
      align-items: center;
      border-radius: 0;
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

      svg {
          transition: all 0.1s linear 0.1s;
          height: 1.2em;
          stroke: ${style.default.ghostColor};
          fill: ${style.default.ghostColor};
      }

      &:hover{
          border: 1px solid  ${style.hover.ghostColor};
          color: ${style.hover.ghostColor};
          svg {
              stroke: ${style.hover.ghostColor};
              fill: ${style.hover.ghostColor};
          }
      }

      &:focus{
          outline: none;
      }
      `;
  }};
`;

export default FilledButton;
