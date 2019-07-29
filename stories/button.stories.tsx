import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Button, { GhostButton } from '../src/Button/Button';
import Icon, { IconLeft, IconRight } from '../src/Icon/Icon';
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
      <Button onClick={action('Click')}><IconLeft />Default</Button>
    </React.Fragment>
  ))
  .add('with icon on the right', () => (
    <React.Fragment>
      <Button onClick={action('Click')}>Default<IconRight /></Button>
    </React.Fragment>
  ))
  .add('primary with text', () => (
    <Button type={'primary'} onClick={action('Click')}>Primary</Button>
  ))
  .add('primary with icon', () => (
    <Button type={'primary'} onClick={action('Click')}><IconLeft />Primary</Button>
  ))
  .add('seondairy with text', () => (
    <Button type={'secondairy'} onClick={action('Click')}>Secondairy</Button>
  ))
  .add('seondairy with icon', () => (
    <Button type={'secondairy'} onClick={action('Click')}><IconLeft />Secondairy</Button>
  ));

storiesOf('Button/Ghost', module)
  .add('with text', () => (
    <GhostButton onClick={action('Click')}>Default</GhostButton>
  ))
  .add('with icon', () => (
    <GhostButton onClick={action('Click')}><Icon /></GhostButton>
  ))
  .add('primary with text', () => (
    <GhostButton type={'primary'} onClick={action('Click')}>Primary</GhostButton>
  ))
  .add('primary with icon', () => (
    <GhostButton type={'primary'} onClick={action('Click')}><IconLeft />Primary</GhostButton>
  ))
  .add('seondairy with text', () => (
    <GhostButton type={'secondairy'} onClick={action('Click')}>Secondairy</GhostButton>
  ))
  .add('seondairy with icon', () => (
    <GhostButton type={'secondairy'} onClick={action('Click')}><IconLeft />Secondairy</GhostButton>
  ));
