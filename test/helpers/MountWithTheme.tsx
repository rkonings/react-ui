import { mount } from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from '../../src/themes/default';

const mountWithTheme = (tree: React.ReactElement) => {
   return mount(
            <ThemeProvider theme={DefaultTheme}>
                {tree}
            </ThemeProvider>
        ).children();
};

export default mountWithTheme;
