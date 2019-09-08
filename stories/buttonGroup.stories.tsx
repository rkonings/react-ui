import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';

import Button from '../src/Button/Button';
import TextButton from '../src/Button/TextButton';
import ButtonGroup from '../src/ButtonGroup/ButtonGroup';
import { CaretDown, Pen, Search, Trash } from '../src/Icon';

import { storiesOf } from '@storybook/react';
import React from 'react';
import ButtonMenu from '../src/Menu/ButtonMenu';
import { MenuItem } from '../src/Menu/Menu';

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

storiesOf('ButtonGroup', module)
  .add('with buttons', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const setActive = boolean('setActive', false);

    return (
      <ButtonGroup setActive={setActive} type={type} size={size}>
        <Button type={'secondairy'} onClick={action('Click')}>Button<CaretDown spacing="left" /></Button>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
      </ButtonGroup>
    );
  })
  .add('with menu', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const setActive = boolean('setActive', false);

    return (
      <ButtonGroup setActive={setActive} type={type} size={size}>
        <Button type={'secondairy'} onClick={action('Click')}>Button<CaretDown spacing="left" /></Button>
        <Button onClick={action('Click')}>Button</Button>
        <ButtonMenu
          items={ (close) => (
              <React.Fragment>
                  <MenuItem onClick={() => close()}>Profile</MenuItem>
                  <MenuItem onClick={() => close()}>Settings</MenuItem>
                  <MenuItem onClick={() => close()}>Sign out</MenuItem>
              </React.Fragment>
            )}
        >
            Menu<CaretDown spacing="left" />
        </ButtonMenu>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
        <Button onClick={action('Click')}>Button</Button>
      </ButtonGroup>
    );
  })
  .add('with text buttons', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const setActive = boolean('setActive', false);

    return (
      <ButtonGroup setActive={setActive} type={type} size={size}>
        <TextButton type={'secondairy'} onClick={action('Click')}>Button<CaretDown spacing="left" /></TextButton>
        <TextButton onClick={action('Click')}>Button</TextButton>
        <TextButton onClick={action('Click')}>Button</TextButton>
        <TextButton onClick={action('Click')}>Button</TextButton>
        <TextButton onClick={action('Click')}>Button</TextButton>
      </ButtonGroup>
    );
  })
  .add('with mixed buttons', () => {
    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    const setActive = boolean('setActive', false);

    return (
      <ButtonGroup setActive={setActive} type={type} size={size}>
        <Button type={'primary'} onClick={action('Click')}>Button<Trash spacing="left" /></Button>
        <TextButton onClick={action('Click')}><Pen /></TextButton>
        <TextButton onClick={action('Click')}><Search /></TextButton>
      </ButtonGroup>
    );
  });
