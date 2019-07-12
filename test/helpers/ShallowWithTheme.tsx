import * as React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from '../../src/themes/default';

const shallowWithTheme = (tree: React.ReactElement<any>) => {
   return shallow(
            <ThemeProvider theme={DefaultTheme}>
                {tree}
            </ThemeProvider>
        ).dive();
};

export default shallowWithTheme;
