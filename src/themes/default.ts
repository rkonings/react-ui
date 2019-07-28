import Theme from '../interfaces/Theme';

import color from './colors';
import button from './buttons';
import table from './table';


const theme: Theme = {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    color,
    button,
    table,
    loader: {
        default: {
            color: color.gray110
        }
    }
};

export default theme;
