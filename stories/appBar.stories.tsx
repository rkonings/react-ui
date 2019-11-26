import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppBar, { AppBarTitle } from '../src/AppBar/AppBar';
import { TextButton } from '../src/Button';
import { Search } from '../src/Icon';
import ButtonMenu from '../src/Menu/ButtonMenu';
import { MenuItem } from '../src/Menu/Menu';

storiesOf('App bar', module)
.add('default', () => {
    return (
        <AppBar>
            <AppBarTitle>App title</AppBarTitle>
            <TextButton type="light" isIcon={true}><Search /></TextButton>
            <ButtonMenu
                type="light"
                variant="text"
                menuAlign="RIGHT"
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
        </AppBar>
    );
});
