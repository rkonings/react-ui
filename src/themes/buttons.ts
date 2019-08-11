import color from './colors';

const Button = {
    fontWeight: 500,
    size: {
        xs: 8,
        s: 10,
        m: 12,
        l: 14,
        xl: 16
    },
    defaultSize: 'm',
    default: {
        default: {
            background: color.gray20,
            color: color.black,
            outlineColor: color.gray100,
        },
        active: {
            background: color.gray60,
            border: color.gray60,
            outlineColor: color.gray110,
            outlineBackground: color.gray20,
        },
        hover: {
            background: color.gray50,
            border: color.gray50,
            outlineColor: color.gray100,
            outlineBackground: color.gray10,
        }
    },
    primary: {
        default: {
            background: color.blue80,
            color: color.white,
            outlineColor: color.blue80,
        },
        active: {
            color: color.white,
            background: color.blue110,
            border: color.blue110,
            outlineColor: color.blue110,
            outlineBackground: color.blue20,
        },
        hover: {
            background: color.blue100,
            border: color.blue100,
            outlineColor: color.blue110,
            outlineBackground: color.blue10,
        }

    },
    secondairy: {
        default: {
            background: color.orange80,
            color: color.white,
            outlineColor: color.orange80,
        },
        active: {
            color: color.white,
            background: color.orange110,
            border: color.orange110,
            outlineColor: color.orange110,
            outlineBackground: color.orange20,
        },
        hover: {
            background: color.orange100,
            border: color.orange100,
            outlineColor: color.orange110,
            outlineBackground: color.orange10,
        }

    }
};

export default Button;
