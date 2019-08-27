import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import React from 'react';

import Login from '../src/UI/Login';

storiesOf('UI/Login', module)
.add('login', () => {

  return (
    <Login onLogin={action('login')}/>
  );
});
