import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../src/themes/default';

const ThemeProviderDecorator = storyFn => (<ThemeProvider theme={defaultTheme}>{storyFn()}</ThemeProvider>);

export default ThemeProviderDecorator;