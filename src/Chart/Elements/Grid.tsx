import React from 'react';
import styled from 'styled-components';

interface LineVertical {
    x: number;
}

export const LineVertical = styled.div<LineVertical>`
    ${({ x }) => `
      left: ${x}px;
      top:0;
      height: 100%;
      width: 1px;
      background: #f3f3e7;
      position: absolute;
    `}
`;

interface LineHorizontal {
    y: number;
}

export const LineHorizontal = styled.div<LineHorizontal>`
    ${({ y }) => `
      top: ${y}px;
      left:0;
      height: 1px;
      width: 100%;
      background: #f3f3e7;
      position: absolute;
    `}
`;

type GridLayout = 'HORIZONTAL' | 'VERTICAL';

interface Grid {
    className?: string;
    scale: d3.ScaleLinear<number, number>;
    amountTicks: number;
    layout: GridLayout;
    width: number;
    height: number;
}

export const Grid = styled(
    ({ className, scale, amountTicks, layout, width }: Grid) => {
        return (
            <div className={className}>
                {scale.ticks(amountTicks).map(tick => {
                    if (layout === 'HORIZONTAL') {
                        return <LineVertical key={tick} x={scale(tick) || 0} />;
                    } else {
                        return (
                            <LineHorizontal key={tick} y={scale(tick) || 0} />
                        );
                    }
                })}
            </div>
        );
    }
)`
    position: absolute;
    top: 0px;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`;
