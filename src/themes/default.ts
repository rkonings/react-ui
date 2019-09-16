import Theme from '../interfaces/Theme';

import button, { buttonGroup } from './buttons';
import color from './colors';
import icon from './icon';
import input from './input';
import table from './table';

const calendar = {
    day: {
        default: {
            color: color.black,
            hover: {
                backgroundColor: color.primary,
                color: color.white,
            }
        },
        selected: {
            backgroundColor: color.primary,
            color: color.white,
        },
        disabled: {
            backgroundColor: color.gray20,
            color: color.gray70,
        },
        inRange: {
            backgroundColor: color.blue10,
            color: color.black,
        },
        inPotentialRange: {
            backgroundColor: color.blue20,
            color: color.black,
        },
        notInMonth: {
            color: color.gray40,
        }
    }
};

const menu = {
    backgroundColor: color.white,
    boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.05);',
    item: {
        default: {
            color: color.black
        },
        active: {
            color: color.white,
            backgroundColor: color.primary
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
    calendar,
    loader: {
        default: {
            color: color.gray110
        }
    }
};

export default theme;
