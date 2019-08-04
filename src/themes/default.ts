import Theme from '../interfaces/Theme';

import button from './buttons';
import color from './colors';
import icon from './icon';
import table from './table';

const theme: Theme = {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    color,
    icon,
    button,
    table,
    loader: {
        default: {
            color: color.gray110
        }
    }
};

export default theme;
