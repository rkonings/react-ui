import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import Login from '../src/UI/Login';
import CreateAccount from '../src/UI/CreateAccount';
import Settings from '../src/UI/Settings';

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
    return <Settings />;
  });
