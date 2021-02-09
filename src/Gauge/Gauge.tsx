import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Gauge = styled.svg``;
const Label = styled.text`
    text-anchor: middle;
    font-size: 32px;
`;

interface IKPIGauge {
    className?: string;
    value: number;
    maxValue: number;
    width: number;
    height: number;
}

export const ArcValue = styled.path`
    fill: ${({ theme: { color } }) => color.primary};
`;

export const ArcBorder = styled.path`
    fill: ${({ theme: { color } }) => color.gray30};
`;

export const ArcBackground = styled.path`
    fill: ${({ theme: { color } }) => color.gray20};
`;
export const GaugeArcOuter = styled.path``;

export default styled(
    ({ className, value, maxValue, width, height }: IKPIGauge) => {
        const arcGenerator = d3.arc();

        const outerRadius = width * 0.5;
        const innerRadius = outerRadius - 2;

        const arcStartAngle = -0.6 * Math.PI;
        const arcEndAngle = 0.6 * Math.PI;

        const arcPathBorder = arcGenerator({
            startAngle: arcStartAngle,
            endAngle: arcEndAngle,
            innerRadius,
            outerRadius,
        });

        const scale = d3
            .scaleLinear()
            .range([arcStartAngle, arcEndAngle])
            .domain([0, maxValue]);

        const arcPathValue = arcGenerator({
            startAngle: arcStartAngle,
            endAngle: scale(value) || 0,
            innerRadius: innerRadius - 20,
            outerRadius: outerRadius - 4,
        });

        const arcPathBackground = arcGenerator({
            startAngle: arcStartAngle,
            endAngle: arcEndAngle,
            innerRadius: innerRadius - 20,
            outerRadius: outerRadius - 4,
        });

        return (
            <div className={className}>
                <Gauge width={width} height={height}>
                    <g transform={`translate(${outerRadius} ${outerRadius})`}>
                        <Label>{value}</Label>
                        {arcPathBorder && <ArcBorder d={arcPathBorder} />}
                        {arcPathBackground && (
                            <ArcBackground d={arcPathBackground} />
                        )}
                        {arcPathValue && <ArcValue d={arcPathValue} />}
                    </g>
                </Gauge>
            </div>
        );
    }
)``;
