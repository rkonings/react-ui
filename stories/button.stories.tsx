import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from '../src/Button/Button';
import OutlinedButton from '../src/Button/OutlinedButton';
import TextButton from '../src/Button/TextButton';
import { Bars, CaretDown } from '../src/Icon';

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

const buttonTextLabel = 'Label';
const buttonTextDefaultValue = 'Button';

const buttonContentAlignmenLabel = 'Content alignment';
const buttonContentAlignmentOptions = ['left', 'center', 'right'];
const buttonContentAlignmentDefaultValue = 'center';

storiesOf('OutlinedButton', module)
.add('with text', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const buttonText = text(buttonTextLabel, buttonTextDefaultValue);
  const active = boolean('Active', false);
  const contentAlignment = select(buttonContentAlignmenLabel, buttonContentAlignmentOptions,
    buttonContentAlignmentDefaultValue);
  const width = number('Width', 100);

  return (
    <OutlinedButton
      active={active}
      type={type}
      width={width}
      size={size}
      contentAlignment={contentAlignment}
      onClick={action('Click')}
    >
      {buttonText}
    </OutlinedButton>
  );
})
.add('with loader', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const active = boolean('Active', false);
  const isLoading = boolean('IsLoading', true);

  return (
    <OutlinedButton
      active={active}
      type={type}
      size={size}
      onClick={action('Click')}
      isLoading={isLoading}
    >
      Save
    </OutlinedButton>
  );
})
.add('with icon on the left', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const buttonText = text(buttonTextLabel, buttonTextDefaultValue);
  const active = boolean('Active', false);
  const contentAlignment = select(buttonContentAlignmenLabel, buttonContentAlignmentOptions,
    buttonContentAlignmentDefaultValue);
  const width = number('Width', 100);

  return (
    <React.Fragment>
      <OutlinedButton
        active={active}
        type={type}
        size={size}
        contentAlignment={contentAlignment}
        width={width}
        onClick={action('Click')}
      >
          <CaretDown spacing="right" />{buttonText}
      </OutlinedButton>
    </React.Fragment>
  );
})
.add('with icon on the right', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const buttonText = text(buttonTextLabel, buttonTextDefaultValue);

  return  (
    <React.Fragment>
      <OutlinedButton
        type={type}
        size={size}
        onClick={action('Click')}
      >
        {buttonText}<CaretDown spacing="left" />
      </OutlinedButton>
    </React.Fragment>
  );
});

storiesOf('TextButton', module)
.add('with text', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const buttonText = text(buttonTextLabel, buttonTextDefaultValue);
  const active = boolean('Active', false);
  const shape = select('Shape', ['DEFAULT', 'CIRCLE'], 'DEFAULT');

  return (
    <TextButton
      active={active}
      type={type}
      size={size}
      onClick={action('Click')}
      shape={shape}
    >
      {buttonText}
    </TextButton>
  );
})
.add('with icon', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const active = boolean('Active', false);
  const shape = select('Shape', ['DEFAULT', 'CIRCLE'], 'DEFAULT');

  return (
    <TextButton
      active={active}
      type={type}
      size={size}
      onClick={action('Click')}
      isIcon={true}
      shape={shape}
    >
      <Bars />
    </TextButton>
  );
})
.add('with loader', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const active = boolean('Active', false);
  const isLoading = boolean('IsLoading', true);

  return (
    <TextButton
      active={active}
      type={type}
      size={size}
      onClick={action('Click')}
      isLoading={isLoading}
    >
      Save
    </TextButton>
  );
})
.add('with icon on the left', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const buttonText = text(buttonTextLabel, buttonTextDefaultValue);
  const active = boolean('Active', false);

  return (
    <React.Fragment>
      <TextButton
        active={active}
        type={type}
        size={size}
        onClick={action('Click')}
      >
          <CaretDown spacing="right" />{buttonText}
      </TextButton>
    </React.Fragment>
  );
})
.add('with icon on the right', () => {
  const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
  const type = select(typeLabel, typeOptions, typeDefaultValue);
  const buttonText = text(buttonTextLabel, buttonTextDefaultValue);

  return  (
    <React.Fragment>
      <TextButton
        type={type}
        size={size}
        onClick={action('Click')}
      >
        {buttonText}<CaretDown spacing="left" />
      </TextButton>
    </React.Fragment>
  );
});

storiesOf('Button', module)
  .add('with text', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const buttonText = text(buttonTextLabel, buttonTextDefaultValue);
    const active = boolean('Active', false);
    const shape = select('Shape', ['DEFAULT', 'CIRCLE'], 'DEFAULT');
    return (
      <Button
        active={active}
        type={type}
        size={size}
        onClick={action('Click')}
        shape={shape}
      >
        {buttonText}
      </Button>
    );
  })
  .add('with icon', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const active = boolean('Active', false);
    const shape = select('Shape', ['DEFAULT', 'CIRCLE'], 'DEFAULT');

    return (
      <React.Fragment>
        <Button
          active={active}
          type={type}
          size={size}
          onClick={action('Click')}
          isIcon={true}
          shape={shape}
        >
            <Bars />
        </Button>
      </React.Fragment>
    );
  })
  .add('with loader', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const active = boolean('Active', false);
    const isLoading = boolean('IsLoading', true);

    return (
      <Button
        active={active}
        type={type}
        size={size}
        onClick={action('Click')}
        isLoading={isLoading}
      >
        Save
      </Button>
    );
  })
  .add('with icon on the left', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const buttonText = text(buttonTextLabel, buttonTextDefaultValue);
    const active = boolean('Active', false);

    return (
      <React.Fragment>
        <Button
          active={active}
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
    const buttonText = text(buttonTextLabel, buttonTextDefaultValue);

    return  (
      <React.Fragment>
        <Button
          type={type}
          size={size}
          onClick={action('Click')}
        >
          {buttonText}<CaretDown spacing="left" />
        </Button>
      </React.Fragment>
    );
  });
