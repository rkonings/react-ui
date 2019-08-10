import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import CheckBox from '../src/Input/Checkbox/Checkbox';

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
