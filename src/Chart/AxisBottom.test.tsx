import React from 'react';
import { mount } from 'enzyme';
import { AxisBottom, Label, TickLabel } from './AxisBottom';
import { scaleBand, scaleLinear } from 'd3-scale';

describe('<AxisBottom />', () => {
    it('should render a Label', () => {
        const scale = scaleBand().domain(['FOO']).padding(0.1).range([0, 400]);

        const axisBottom = mount(<AxisBottom width={400} height={200} scale={scale} amountTicks={5} />);
        expect(axisBottom.find(Label).length).toBe(1);
    });

    it('should render a TickLabel', () => {
        const scale = scaleLinear().domain([0, 1000]).nice(5).range([100, 0]);

        const axisBottom = mount(<AxisBottom width={100} height={200} scale={scale} amountTicks={5} />);
        expect(axisBottom.find(TickLabel).exists()).toBe(true);
    });
});
