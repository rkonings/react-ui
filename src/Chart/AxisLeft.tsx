import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

interface TickLabel {
    y: number;
    width: number;
}

export const TickLabel = styled.div<TickLabel>`
    ${({ y, width }) => `
        top: ${y}px;
        right:6px;
        transform: translateY(-50%);
        width: ${width}px;
        position:absolute;
        color: #8B8B8B;
        display:flex;
        justify-content: flex-end;

        &::before {
            content: '';
            position: absolute;
            width: 5px;
            height: 1px;
            background: #ccc;
            right: -6px;
            top: 50%;;
        }
    `}
`;

interface AxisLeft {
    className?: string;
    scale: d3.ScaleLinear<number, number>;
    amountTicks: number;
    height: number;
    width: number;
}

export const AxisLeft = styled(
    ({ className, scale, amountTicks }: AxisLeft) => {
        return (
            <div className={className}>
                {scale.ticks(amountTicks).map(tick => (
                    <TickLabel key={tick} width={50} y={scale(tick) || 0}>
                        {tick}
                    </TickLabel>
                ))}
            </div>
        );
    }
)`
    position: absolute;
    left: 0px;
    top: 10px;
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
    border-right: 1px solid #f5f5f5;
`;
