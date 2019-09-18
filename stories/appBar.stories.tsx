import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppBar, { AppBarTitle } from '../src/AppBar/AppBar';
import { TextButton } from '../src/Button';
import { Bars, Search } from '../src/Icon';

storiesOf('App bar', module)
.add('default', () => {
    return (
        <AppBar>
            <AppBarTitle>App title</AppBarTitle>
            <TextButton type="light" isIcon={true}><Search /></TextButton>
            <TextButton type="light" isIcon={true}><Bars /></TextButton>
        </AppBar>
    );
});
