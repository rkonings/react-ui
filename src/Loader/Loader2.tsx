import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Theme from '../interfaces/Theme';
/* https://codepen.io/rbv912/pen/dYbqLQ */

interface LoaderProps {
    className?: string;
}

const Loader = ({ className }: LoaderProps) => {
    return (
        <div className={className}>
            <span />
        </div>
    );
};

const KeyFrame1 = keyframes`
    0%   { transform: scale(0); opacity: 0; }
	50%  { transform: scale(1); opacity: 1; }
	100% { transform: scale(0); opacity: 0; }
`;

const KeyFrame2 = keyframes`
    0%   { transform: rotate(0deg); }
	50%  { transform: rotate(180deg); }
	100% { transform: rotate(360deg); }
`;

const KeyFrame3 = keyframes`
    0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(-16px, 0, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const KeyFrame4 = keyframes`
    0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(16px, 0, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const getColor = (theme: Theme) => theme.loader.default.color;

const StyledLoader = styled(Loader)`
    ${({ theme }) => css`
        height: 32px;
        width: 32px;
        box-sizing: border-box;

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 12px;
            height: 12px;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            background: ${getColor(theme)};
            border-radius: 50%;
            animation: ${KeyFrame1} 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }

        span {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            height: 32px;
            width: 32px;
            animation: ${KeyFrame2} 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;

            &::before,
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                height: 12px;
                width: 12px;
                background: #000;
                border-radius: 50%;
                animation: ${KeyFrame3} 2s cubic-bezier(0.77, 0, 0.175, 1)
                    infinite;
            }

            &::after {
                animation: ${KeyFrame4} 2s cubic-bezier(0.77, 0, 0.175, 1)
                    infinite;
            }
        }
    `}
`;

export default StyledLoader;
