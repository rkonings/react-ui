import { storiesOf } from '@storybook/react';
import faker from 'faker';
import React from 'react';
import { InvoiceBuilder } from '../src/UI/InvoiceBuilder';
import { CompanyData } from '../src/UI/InvoiceBuilder/interfaces';

storiesOf('Invoice builder', module)
.add('default', () => {

    const client = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        companyName: faker.company.companyName(),
        address: faker.address.streetAddress(),
        zipcode: faker.address.zipCode(),
        city: faker.address.city(),
    };

    const company: CompanyData = {
        name: faker.company.companyName(0),
        address: faker.address.streetAddress(),
        zipcode: faker.address.zipCode(),
        city: faker.address.city(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        website: faker.internet.domainName(),
        vatNumber: faker.finance.account(),
        bankAccount: faker.finance.account(),
        coc: faker.finance.account()
    };

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
        <InvoiceBuilder
            client={client}
            items={items}
            company={company}
            dueDate="2014-06-12"
            date="2019-10-10"
            invoiceNumber={faker.finance.account(10)}
            logo={'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png'}
        />
    );
});
