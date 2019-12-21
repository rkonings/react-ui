import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import StoryRouter from 'storybook-react-router';
import Login from '../src/UI/Login';
import CreateAccount from '../src/UI/CreateAccount';
import Settings from '../src/UI/Settings';
import ClientInfo from '../src/UI/Client/ClientInfo';
import faker from 'faker';

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
