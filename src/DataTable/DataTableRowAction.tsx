import * as React from 'react';
import styled from 'styled-components';
import Theme from '../interfaces/Theme';

interface RowActionProps {
    children: string | JSX.Element;
    className?: string;
    theme: Theme;
    onClick?(event: React.MouseEvent): void;
  }
  const RowAaction = ({children, className, onClick }: RowActionProps): JSX.Element => {
    return (
      <button className={className} type={`button`} onClick={onClick}>
        {children}
      </button>
    );
  };

  export default styled(RowAaction)`
      ${({theme}: RowActionProps) => `
          font-family: ${theme.fontFamily};
          font-weight: ${theme.button.fontWeight};
          background: none;
          border: none;
          display: flex;
          font-size: 12px;
          overflow: hidden;
          align-items: center;
          border-radius: 0;
          cursor: pointer;
          position: relative;
          transition: color 0.1s linear 0.1s;
          text-transform: uppercase;
          height: 12px;

          &:hover {
              svg {
                  fill: ${theme.color.gray110};
              }
          }

          svg {
              height: 10px;
              width: 10px;
              fill: ${theme.color.gray80};
          }

          &:focus{
              outline: none;
          }
      `}
  `;
