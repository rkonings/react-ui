import 'jest-styled-components';
import * as React from 'react';

import { mountWithTheme } from './helpers';

import Color from '../src/Color/Color';
import DefaultTheme from '../src/themes/default';

describe('<Color />', () => {
    test('render with given color', () => {
        const wrapper = mountWithTheme(<Color color="blue10" />);
        expect(wrapper).toHaveStyleRule('background', DefaultTheme.color.blue10);
    });
});
