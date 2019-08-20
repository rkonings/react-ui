import { storiesOf } from '@storybook/react';
import React from 'react';
import Loader from '../src/Loader/Loader';
import Loader2 from '../src/Loader/Loader2';

storiesOf('Loader', module)
  .add('Loader', () => (
    <Loader size={26} speed={0.8} />
  ))
  .add('Loader 2', () => (
    <Loader2/>
  ));
