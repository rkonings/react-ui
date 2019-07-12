import * as React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from '../../src/themes/default';

const mountWithTheme = (tree: React.ReactElement<any>) => {
   return mount(
            <ThemeProvider theme={DefaultTheme}>
                {tree}
            </ThemeProvider>
        ).children();
};

export default mountWithTheme;
