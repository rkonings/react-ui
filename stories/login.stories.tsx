import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import StoryRouter from 'storybook-react-router';
import Login from '../src/UI/Login';
import CreateAccount from '../src/UI/CreateAccount';
import Settings from '../src/UI/Settings';
import OfferForm, { Offer } from '../src/UI/OfferForm';
import faker from 'faker';
import Task from '../src/UI/Task';
import moment from 'moment';

storiesOf('UI/Offer', module)
    .addDecorator(StoryRouter())
    .add('default', () => {
        const Wrapper = styled.div`
            width: 100%;
            height: 100%;
            display: flex;
            align-self: flex-start;
        `;

        const offer: Offer = {
            id: 'FOO',
            type: 'particulier',
            reference: 'FOOBAZ',
            date: '02/03/2020',
            expiration: 14,
            client: 'Ajax Amsterdam',
            user: 'R. Konings',
            assemblyHours: {
                assembly: 10,
                electricity: 4,
                refrigeration: 4,
            },
            installation: {
                type: 'single',
                indoorUnits: ['2.0 kW'],
                outdoorUnits: ['2.0 kW'],
                amountDrillHoles: 2,
                coolingPipe: 10,
                electricity: {
                    communication: 20,
                    control: 20,
                    power: 20,
                    powerGroup: '',
                },
                mounting: {
                    wallBracket: '> 40kg',
                },
                pump: {
                    type: 'PUMP 001',
                    amount: 1,
                },
            },
        };

        return (
            <Wrapper>
                <OfferForm offer={offer} onChange={action('login')} />
            </Wrapper>
        );
    });

storiesOf('UI/ClientInfo', module).add('default', () => {
    const client = {
        _id: 'FOO',
        name: 'John Cruijf',
        address: 'Arena boulevard 6',
        zipcode: '3445 JC',
        city: 'Amsterdam',
        telephone: '020 234 43 54',
        type: 'Klant',
    };

    const Wrapper = styled.div`
        width: 300px;
    `;

    return (
        <Wrapper>
            <ClientInfo client={client} onChange={action('login')} />
        </Wrapper>
    );
});

storiesOf('UI/Forms', module)
    .add('task with values', () => {
        const values = {
            title: 'FOO',
            description: 'BAZ',
            start: moment().toDate(),
            end: moment()
                .add(1, 'h')
                .toDate(),
        };

        return <Task task={values} onChange={action('onchange')} />;
    })
    .add('task', () => {
        return <Task onChange={action('onchange')} />;
    })
    .add('login', () => {
        return <Login onLogin={action('login')} />;
    })
    .add('Create account', () => {
        return <CreateAccount onCreate={action('Create account')} />;
    });

storiesOf('UI/Settings', module)
    .addDecorator(StoryRouter())
    .add('Settings', () => {
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.hacker.adjective(),
            email: faker.internet.email(),
            settings: {
                language: 'UK',
                dateFormat: 'UK',
                pushNotifications: true,
                unscribeEmailLink: true,
                signature: faker.lorem.words(4),
            },
        };

        return <Settings onChange={action('change')} user={user} />;
    });
