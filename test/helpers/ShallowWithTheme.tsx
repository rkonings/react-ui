import { shallow } from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from '../../src/themes/default';

const shallowWithTheme = (tree: React.ReactElement, theme = DefaultTheme) => {
   return shallow(
            <ThemeProvider theme={theme}>
                {tree}
            </ThemeProvider>
        ).dive();
};

export default shallowWithTheme;
