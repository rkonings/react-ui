import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import CreateAccount from '../src/UI/CreateAccount';
import Login from '../src/UI/Login';

storiesOf('UI/Forms', module)
.add('login', () => {

  return (
    <Login onLogin={action('login')}/>
  );
})
.add('Create account', () => {

  return (
    <CreateAccount onCreate={action('Create account')}/>
  );
});
