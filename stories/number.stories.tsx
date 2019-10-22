import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { NumberFormatter } from '../src/Formatter';

storiesOf('number', module)
.add('default', () => {
    const value = number('Value', 1000);
    return (
        <NumberFormatter value={value} />
    );
} )
.add('short', () => {
    const value = number('Value', 1000);
    return (
        <NumberFormatter value={value} short={true} />
    );
} )

.add('currency', () => {
    const value = number('Value', 1000);
    return (
        <NumberFormatter value={value} type="currency" />
    );
} );
