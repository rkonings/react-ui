import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';

import Button from '../src/Button/Button';
import ButtonGroup from '../src/ButtonGroup/ButtonGroup';
import { CaretDown } from '../src/Icon';

import { storiesOf } from '@storybook/react';
import React from 'react';

const sizeLabel = 'Size';
const sizeOptions = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'l',
  xl: 'xl'
};
const sizeDefaultValue = 'm';

const typeLabel = 'Type';
const typeOptions = ['default', 'primary', 'secondairy'];
const typeDefaultValue = 'default';

const outlineLabel = 'Outline';
const outlineDefaultValue = false;

storiesOf('ButtonGroup', module)
  .add('with buttons', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const outline = boolean(outlineLabel, outlineDefaultValue);

    return (
      <ButtonGroup outline={outline} type={type} size={size}>
        <Button type={'secondairy'} onClick={action('Click')}>Button<CaretDown spacing="left" /></Button>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
      </ButtonGroup>
    );
  });
