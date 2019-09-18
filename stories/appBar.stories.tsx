import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppBar, { AppBarTitle } from '../src/AppBar/AppBar';

storiesOf('App bar', module)
.add('default', () => {
    return (
        <AppBar>
            <AppBarTitle>App title</AppBarTitle>
        </AppBar>
    );
});
