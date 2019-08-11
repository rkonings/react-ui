import Theme from '../interfaces/Theme';

import button, { buttonGroup } from './buttons';
import color from './colors';
import icon from './icon';
import input from './input';
import table from './table';

const theme: Theme = {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    color,
    icon,
    input,
    button,
    buttonGroup,
    table,
    loader: {
        default: {
            color: color.gray110
        }
    }
};

export default theme;
