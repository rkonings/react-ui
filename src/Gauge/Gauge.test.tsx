import React from 'react';
import { mountWithTheme } from '../../test/helpers';
import Gauge, { ArcValue } from './Gauge';
import 'jest-styled-components';

import theme from '../themes/default';
import { arc } from 'd3';

describe('<Gauge />', () => {
    test.skip('should render a Gauge', () => {
        const wrapper = mountWithTheme(
            <Gauge width={100} maxValue={1000} value={100} height={200} />
        );

        expect(wrapper.find('path').length).toBe(3);
        expect(wrapper.find('text').length).toBe(1);
        expect(wrapper.find('text').text()).toBe(100);
    });
    test.skip('should render the ArcValue path', () => {
        const width = 100;
        const height = 100;
        const value = 100;
        const maxValue = 200;

        const wrapper = mountWithTheme(
            <Gauge
                width={width}
                maxValue={maxValue}
                value={value}
                height={height}
            />
        );

        const arcGenerator = arc();

        const outerRadius = width * 0.5;
        const innerRadius = outerRadius - 2;

        const arcStartAngle = -0.6 * Math.PI;

        const arcPathValue = arcGenerator({
            startAngle: arcStartAngle,
            endAngle: 0,
            innerRadius: innerRadius - 20,
            outerRadius: outerRadius - 4,
        });

        const ArcPath = wrapper.find(ArcValue);
        expect(ArcPath.length).toBe(1);
        expect(ArcPath.getDOMNode().getAttribute('d')).toEqual(arcPathValue);
    });
    test('the arc has color primary from theme', () => {
        const wrapper = mountWithTheme(
            <Gauge width={100} maxValue={100} value={100} height={100} />
        );

        const arc = wrapper.find(ArcValue);
        expect(arc).toHaveStyleRule('fill', theme.color.primary);
    });
    test.skip('the label has a formatted value (10000 -> 1k)', () => {});
});
