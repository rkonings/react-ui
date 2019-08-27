import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import CheckBox from '../src/Input/Checkbox/Checkbox';
import TextField from '../src/Input/TextField/TextField';

const typeLabel = 'Type';
const typeOptions = ['default', 'primary', 'secondairy'];
const typeDefaultValue = 'default';

const sizeLabel = 'Size';
const sizeOptions = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'l',
  xl: 'xl'
};
const sizeDefaultValue = 'm';

storiesOf('Input', module)
  .add('Checkbox', () => {
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    return (
        <CheckBox type={type} size={size} onChange={action('onChange')} checked={boolean('Checked', false)} />
        );
});
storiesOf('Input/TextField', module)
.add('with value', () => {
  const value = text('Value', 'react@development.nl');
  return (
    <TextField value={value} onChange={action('onChange')} />
  );
})
.add('with placeholder', () => {
  const placeholder = text('Placeholder', 'e-mail');
  return (
    <TextField placeHolder={placeholder} onChange={action('onChange')} />
  );
})
.add('with helper text', () => {
  const helperText = text('Helper text', 'some information');
  return (
    <TextField placeHolder={'name'} helperText={helperText} onChange={action('onChange')} />
  );
})
.add('with error', () => {
  return (
    <TextField placeHolder={'name'} error={'this is required'} onChange={action('onChange')} />
  );
})
.add('with autofocus', () => {
  return (
    <TextField autoFocus={true} placeHolder={'name'} onChange={action('onChange')} />
  );
});
