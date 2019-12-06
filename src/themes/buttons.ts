import color from './colors';

const Button = {
    fontWeight: 500,
    size: {
        xs: 8,
        s: 10,
        m: 12,
        l: 14,
        xl: 16,
    },
    defaultSize: 'm',
    default: {
        default: {
            main: color.gray20,
            text: color.black,
            outlined: color.black,
        },
        active: {
            main: color.gray60,
            text: color.black,
            outlined: color.black,
        },
        hover: {
            main: color.gray50,
            text: color.black,
            outlined: color.gray100,
        },
    },
    primary: {
        default: {
            main: color.blue80,
            text: color.white,
            outlined: color.blue80,
        },
        active: {
            main: color.blue110,
            text: color.white,
            outlined: color.blue110,
        },
        hover: {
            main: color.blue100,
            text: color.white,
            outlined: color.blue100,
        },
    },
    secondairy: {
        default: {
            main: color.orange80,
            text: color.white,
            outlined: color.orange80,
        },
        active: {
            main: color.orange110,
            text: color.white,
            outlined: color.orange110,
        },
        hover: {
            main: color.orange100,
            text: color.white,
            outlined: color.orange100,
        },
    },
    light: {
        default: {
            main: color.white,
            text: color.black,
            outlined: color.white,
        },
        active: {
            main: color.white,
            text: color.black,
            outlined: color.white,
        },
        hover: {
            main: color.white,
            text: color.black,
            outlined: color.white,
        },
    },
};

export const buttonGroup = {
    default: {
        borderColor: color.gray40,
    },
    primary: {
        borderColor: color.blue100,
    },
    secondairy: {
        borderColor: color.orange100,
    },
};

export default Button;
