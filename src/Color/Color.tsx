import * as React from 'react';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';

import { readableColor } from 'polished';

interface ColorProps {
    className?: string;
    color: string;
}
const Color = ({ color, className }: ColorProps) => {
    const theme = useTheme();
    return (
        <div className={className}>
            <div>{color}</div>
            {theme.color[color]}
        </div>
    );
};

export default styled(Color)`
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: ${({ theme: { fontFamily } }) => fontFamily};
    justify-content: center;
    flex-direction: column;
    text-align: center;
    color: ${({ theme: { color }, ...props }) =>
        readableColor(color[props.color])};
    height: 100px;
    background: ${({ theme: { color }, ...props }) => {
        return color[props.color];
    }};
`;
