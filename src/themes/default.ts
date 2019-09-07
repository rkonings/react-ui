import Theme from '../interfaces/Theme';

import button, { buttonGroup } from './buttons';
import color from './colors';
import icon from './icon';
import input from './input';
import table from './table';

const menu = {
    backgroundColor: color.white,
    boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.05);',
    item: {
        default: {
            color: color.black
        },
        hover: {
            color: color.white,
            backgroundColor: color.primary
        }
    }
};

const align = (contentAlignment = 'center') => {
    let align;
    if (contentAlignment === 'center') {
        align = 'center';
    } else if (contentAlignment === 'right') {
        align = 'flex-end';
    } else {
        align = 'flex-start';
    }
    return `justify-content: ${align};`;
};

const theme: Theme = {
    align,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    color,
    icon,
    input,
    button,
    buttonGroup,
    menu,
    table,
    loader: {
        default: {
            color: color.gray110
        }
    }
};

export default theme;
