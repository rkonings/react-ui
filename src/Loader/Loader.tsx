import * as React from 'react';
import styled, { keyframes } from 'styled-components';
/* https://codepen.io/rbv912/pen/dYbqLQ */

interface LoaderProps {
    className?: string;
    size: number;
    speed?: number;
}

const Loader = ({className}: LoaderProps) => {
    return <div className={className}><span /></div>;
};

const LoaderKeyFrames = keyframes`
    0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const LoaderInnerKeyFrames = keyframes`
    0%   { transform: rotate(0deg); }
	100% { transform: rotate(220deg); }
`;

const LoaderInnerAfterKeyFrames = keyframes`
    0%   { transform: rotate(-140deg); }
	50%  { transform: rotate(-160deg); }
	100% { transform: rotate(140deg); }
`;

const StyledLoader = styled(Loader)`
    height: ${({size}) => size}px;
    width: ${({size}) => size}px;
    animation: ${LoaderKeyFrames} ${({speed = 1}) => 4.8 / speed}s linear infinite;
    box-sizing: border-box;

    span {
        box-sizing: border-box;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: ${({size}) => size}px;
        width: ${({size}) => size}px;
        clip: rect(0, ${({size}) => size}px, ${({size}) => size}px, ${({size}) => size * 0.5}px);
        animation: ${LoaderInnerKeyFrames} ${({speed = 1}) => 1.2 / speed}s linear infinite;

        &::after {
            box-sizing: border-box;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            height: ${({size}) => size}px;
            width: ${({size}) => size}px;
            clip: rect(0, ${({size}) => size}px, ${({size}) => size}px, ${({size}) => size * 0.5}px);
            border: 3px solid ${({theme: { loader }}) => loader.default.color};
            border-radius: 50%;
            animation: ${LoaderInnerAfterKeyFrames} ${({speed = 1}) => 1.2 / speed}s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
        }
    }
`;

export default StyledLoader;
