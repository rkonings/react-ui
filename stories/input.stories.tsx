import { action } from '@storybook/addon-actions';
import { array, boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import React from 'react';

import { Grid, Item } from '../src/Grid';
import CheckBox from '../src/Input/Checkbox/Checkbox';
import DateRangePicker from '../src/Input/DateRangePicker/DaterangePicker';
import Select from '../src/Input/Select/Select';
import Switch from '../src/Input/Switch/Switch';
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

const inputTypeLabel = 'Input Type';
const inputTypeOptions = ['text', 'password', 'email'];
const inputTypeDefault = 'text';

storiesOf('Input/DateRangePicker', module)
.add('advanced', () => {

  const options = {
      range: true,
      min: 2000,
      max: 2028,
      step: 1,
  };

  const range = {
      start: moment([2019, 0, 1]),
      end: moment([2019, 0, 14])
  };

  return (
    <DateRangePicker
      onChange={action('onChange')}
    />
  );
});

storiesOf('Input/Select', module)
  .add('default', () => {

    const options = [
      'Dijkstra - Jacobs',
      'Ven V.O.F.',
      'Janssen, Groot and Dijk',
      'Boer, Stichting and Jacobs',
      'Willems Group',
      'Brink, Brink and Dijkstra',
      'Smits, Boer and Brouwer'
    ];
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    return (
      <Grid width="600px" horizontalAlignment="flex-start">
        <Item width="100%" horizontalAlignment="flex-start" verticalAlignment="center">
          <Select
            size={size}
            onChange={action('onChange')}
            options={array('Options', options, ':')}
            name={'companies'}
          />
          </Item>
        </Grid>
    );
})
.add('with helper text', () => {

  const options = [
    'Dijkstra - Jacobs',
    'Ven V.O.F.',
    'Janssen, Groot and Dijk',
    'Boer, Stichting and Jacobs',
    'Willems Group',
    'Brink, Brink and Dijkstra',
    'Smits, Boer and Brouwer'
  ];
  return (
    <Grid width="600px" horizontalAlignment="flex-start">
      <Item width="100%" horizontalAlignment="flex-start" verticalAlignment="center">
        <Select
          onChange={action('onChange')}
          options={array('Options', options, ':')}
          name={'companies'}
          helperText={'This is a helper'}
        />
        </Item>
      </Grid>
  );
})
.add('with error', () => {

  const options = [
    'Dijkstra - Jacobs',
    'Ven V.O.F.',
    'Janssen, Groot and Dijk',
    'Boer, Stichting and Jacobs',
    'Willems Group',
    'Brink, Brink and Dijkstra',
    'Smits, Boer and Brouwer'
  ];
  return (
    <Grid width="600px" horizontalAlignment="flex-start">
      <Item width="100%" horizontalAlignment="flex-start" verticalAlignment="center">
        <Select
          onChange={action('onChange')}
          options={array('Options', options, ':')}
          name={'companies'}
          errorText={'This is an error'}
        />
        </Item>
      </Grid>
  );
});
storiesOf('Input/Checkbox', module)
  .add('with label', () => {
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const label = text('Label', 'label');
    return (
        <CheckBox
          type={type}
          size={size}
          label={label}
          onChange={action('onChange')}
          checked={boolean('Checked', false)}
        />
        );
})
.add('with error', () => {
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const label = text('Label', 'label');
  return (
      <CheckBox
        type={type}
        size={size}
        label={label}
        onChange={action('onChange')}
        errorText={'Error'}
        // helperText={'This is a helper'}
        checked={boolean('Checked', false)}
      />
      );
})
.add('with helper', () => {
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const label = text('Label', 'label');
  return (
      <CheckBox
        type={type}
        size={size}
        label={label}
        onChange={action('onChange')}
        helperText={'This is a helper'}
        checked={boolean('Checked', false)}
      />
      );
});
storiesOf('Input/Switch', module)
.add('swtich', () => {

  return (
    <Switch
      label={text('Label', 'remember me')}
      onChange={action('onChange')}
      checked={boolean('Checked', false)}
    />
  );
})
.add('with helper', () => {

  return (
    <Switch
      label={text('Label', 'remember me')}
      onChange={action('onChange')}
      checked={boolean('Checked', false)}
      helperText={'This is a helper'}
    />
  );
})
;

storiesOf('Input/TextField', module)
.add('with value', () => {
  const value = text('Value', 'react@development.nl');
  const inputType = select(inputTypeLabel, inputTypeOptions, inputTypeDefault);
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const style = select('Style', ['default', 'outlined'], 'default');

  return (
    <TextField
      value={value}
      inputType={inputType}
      size={size}
      onChange={action('onChange')}
      style={style}
    />
  );
})
.add('with onFocus & onBlur', () => {
  const value = text('Value', 'react@development.nl');
  const inputType = select(inputTypeLabel, inputTypeOptions, inputTypeDefault);
  const style = select('Style', ['default', 'outlined'], 'default');
  return (
    <TextField
      value={value}
      inputType={inputType}
      onFocus={action('onFocus')}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      style={style}
    />
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
    <TextField placeHolder={'name'} errorText={'this is required'} onChange={action('onChange')} />
  );
})
.add('with autofocus', () => {
  return (
    <TextField autoFocus={true} placeHolder={'name'} onChange={action('onChange')} />
  );
})
.add('with custom width', () => {
  const width = text('Width', '200px');
  return (
    <TextField placeHolder={'name'} width={width} onChange={action('onChange')} />
  );
})
.add('with disabled', () => {
  const disabled = boolean('Disabled', true);
  return (
    <TextField placeHolder={'name'} disabled={disabled} onChange={action('onChange')} />
  );
});
