import { storiesOf } from '@storybook/react';
import React from 'react';
import { InvoiceBuilder } from '../src/UI/InvoiceBuilder';

storiesOf('Invoice builder', module)
.add('default', () => {

    const items = [
        {
            name: 'Product BAZZ',
            price: 20.00,
            quantity: 1,
            tax: 21
        },
        {
            name: 'Prdocut FOO',
            price: 130.56,
            quantity: 5,
            tax: 21
        },
        {
            name: 'Prdocut FOOBAZZ',
            price: 23,
            quantity: 10.00,
            tax: 9
        }
    ];

    return (
        <InvoiceBuilder items={items} />
    );
});
