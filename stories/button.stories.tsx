import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from '../src/Button/Button';
import { CaretDown } from '../src/Icon';
import Loader from '../src/Loader/Loader';

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

const buttonTextLabel = 'Label';
const buttonTextDefaultValue = 'Button';

storiesOf('Button', module)
  .add('with text', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const outline = boolean(outlineLabel, outlineDefaultValue);
    const buttonText = text(buttonTextLabel, buttonTextDefaultValue);

    return (
      <Button outline={outline} type={type} size={size} onClick={action('Click')}>{buttonText}</Button>
    );
  })
  .add('with loader', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const outline = boolean(outlineLabel, outlineDefaultValue);

    return (
      <Button type={type} outline={outline} size={size} onClick={action('Click')}><Loader size={20} /></Button>
    );
  })
  .add('with icon on the left', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const outline = boolean(outlineLabel, outlineDefaultValue);
    const buttonText = text(buttonTextLabel, buttonTextDefaultValue);

    return (
      <React.Fragment>
        <Button
          outline={outline}
          type={type}
          size={size}
          onClick={action('Click')}
        >
            <CaretDown spacing="right" />{buttonText}
        </Button>
      </React.Fragment>
    );
  })
  .add('with icon on the right', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const outline = boolean(outlineLabel, outlineDefaultValue);
    const buttonText = text(buttonTextLabel, buttonTextDefaultValue);

    return  (
      <React.Fragment>
        <Button
          outline={outline}
          type={type}
          size={size}
          onClick={action('Click')}
        >
          {buttonText}<CaretDown spacing="left" />
        </Button>
      </React.Fragment>
    );
  });
