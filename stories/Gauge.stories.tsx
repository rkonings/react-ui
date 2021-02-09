import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import Gauge from '../src/Gauge/Gauge';

storiesOf('Gauge', module).add('default', () => {
    const width = number('width', 200);
    const height = number('height', 200);
    const value = number('value', 100);
    const maxValue = number('maxValue', 200);
    return (
        <Gauge
            width={width}
            value={value}
            height={height}
            maxValue={maxValue}
        />
    );
});
