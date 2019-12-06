import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import Login from '../src/UI/Login';
import CreateAccount from '../src/UI/CreateAccount';
import Settings from '../src/UI/Settings';
import faker from 'faker';

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
      settings: {
        language: 'UK',
        dateFormat: 'UK',
        pushNotifications: true,
        unscribeEmailLink: true,
        signature: faker.lorem.words(4)
      }

    };

    return <Settings onChange={action('change')} user={user} />;
  });
