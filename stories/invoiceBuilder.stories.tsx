import { storiesOf } from '@storybook/react';
import React from 'react';
import { InvoiceBuilder } from '../src/UI/InvoiceBuilder';

storiesOf('Invoice builder', module)
.add('default', () => {

    const items = [
        {
            name: 'Product BAZZ',
            price: 2000,
            quantity: 1,
            tax: 21
        },
        {
            name: 'Prdocut FOO',
            price: 13056,
            quantity: 5,
            tax: 21
        },
        {
            name: 'Prdocut FOOBAZZ',
            price: 23,
            quantity: 1000,
            tax: 9
        }
    ];

    return (
        <InvoiceBuilder items={items} />
    );
});
