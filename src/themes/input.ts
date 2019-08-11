import color from './colors';

const checkbox = {
    borderRadius: '2px',
    borderSize: '1px',
    size: {
        xs: 10,
        s: 12,
        m: 14,
        l: 16,
        xl: 18
    },
    default: {
        default: {
            borderColor: color.gray60,
            color: color.gray120,
            backgroundColor: 'none',
        },
        hover: {
            borderColor: color.gray100
        },
        checked: {
            backgroundColor: 'none',
            borderColor: color.gray60,
            color: color.gray120
        }
    },
    primary: {
        default: {
            borderColor: color.gray60,
            color: color.gray120,
            backgroundColor: 'none',
        },
        hover: {
            borderColor: color.gray100
        },
        checked: {
            backgroundColor: color.primary,
            borderColor: color.gray60,
            color: color.white
        }
    },
    secondairy: {
        default: {
            borderColor: color.gray60,
            color: color.gray120,
            backgroundColor: 'none',
        },
        hover: {
            borderColor: color.gray100
        },
        checked: {
            backgroundColor: color.secondairy,
            borderColor: color.gray60,
            color: color.white
        }

    }

};

export default {
    checkbox
};
