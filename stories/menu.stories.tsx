import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ButtonMenu from '../src/Menu/ButtonMenu';
import { MenuItem } from '../src/Menu/Menu';

storiesOf('Menu', module)
.add('Button menu', () => {
    const menuAlign = select('Menu alignment', ['LEFT', 'RIGHT'], 'LEFT');

  return (
      <ButtonMenu
        menuAlign={menuAlign}
        items={ (close) => (
            <React.Fragment>
                <MenuItem onClick={() => close()}>Profile</MenuItem>
                <MenuItem onClick={() => close()}>Settings</MenuItem>
                <MenuItem onClick={() => close()}>Sign out</MenuItem>
            </React.Fragment>
          )}
      >
          Menu
      </ButtonMenu>
  );
});
