import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
    html, body {
       height: 100%;
       margin:0;
    }

    #root {
      height: 100%;
      width: 100%;
    }

    body {
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;
