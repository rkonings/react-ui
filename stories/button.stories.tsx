import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from '../src/Button/Button';
import { CaretDown } from '../src/Icon';
import Loader from '../src/Loader/Loader';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('Click')}>Default</Button>
  ))
  .add('with loader', () => (
    <Button onClick={action('Click')}><Loader size={20} /></Button>
  ))
  .add('with icon on the left', () => (
    <React.Fragment>
      <Button onClick={action('Click')}><CaretDown spacing="right" />Default</Button>
    </React.Fragment>
  ))
  .add('with icon on the right', () => (
    <React.Fragment>
      <Button onClick={action('Click')}>Default<CaretDown spacing="left" /></Button>
    </React.Fragment>
  ))
  .add('primary with text', () => (
    <Button type={'primary'} onClick={action('Click')}>Primary</Button>
  ))
  .add('primary with icon', () => (
    <Button type={'primary'} onClick={action('Click')}><CaretDown spacing="right" />Primary</Button>
  ))
  .add('seondairy with text', () => (
    <Button type={'secondairy'} onClick={action('Click')}>Secondairy</Button>
  ))
  .add('seondairy with icon', () => (
    <Button type={'secondairy'} onClick={action('Click')}><CaretDown spacing="right" />Secondairy</Button>
  ));

storiesOf('Button/outline', module)
  .add('with text', () => (
    <Button outline={true} onClick={action('Click')}>Default</Button>
  ))
  .add('with icon', () => (
    <Button outline={true} onClick={action('Click')}><CaretDown /></Button>
  ))
  .add('primary with text', () => (
    <Button outline={true} type={'primary'} onClick={action('Click')}>Primary</Button>
  ))
  .add('primary with icon', () => (
    <Button outline={true} type={'primary'} onClick={action('Click')}><CaretDown spacing="right" />Primary</Button>
  ))
  .add('seondairy with text', () => (
    <Button outline={true} type={'secondairy'} onClick={action('Click')}>Secondairy</Button>
  ))
  .add('seondairy with icon', () => (
    <Button
      outline={true}
      type={'secondairy'}
      onClick={action('Click')}
    >
      <CaretDown spacing="right" />
      Secondairy
    </Button>
  ));
