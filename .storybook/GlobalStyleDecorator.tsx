import { addDecorator } from '@storybook/react';
import React from 'react';

import GlobalStyles from '../src/GlobalStyle';

import { createGlobalStyle } from 'styled-components';

const StoryStyle = createGlobalStyle`
    html, body {
       height: 100%;
       margin:0;
    }

    #root {
      height: 100%;
      width: 100%;
    }
`;

// https://medium.com/@cbovis/using-the-styled-components-createglobalstyle-api-with-react-storybook-e2e64255d567

const GlobalStyleDecorator = (storyFn) => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <StoryStyle />
      {storyFn()}
    </React.Fragment>
  );
};

export default GlobalStyleDecorator;
