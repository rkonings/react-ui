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
            label: color.gray70,
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

const select = {
    borderSize: '1px',
    default: {
        borderColor: color.gray60,
        color: color.gray120,
        item: {
            color: color.gray120,
        }
    },
    hover: {
        borderColor: color.blue110,
        item: {
            color: color.white,
            backgroundColor: color.blue90,
        }
    },
    focus: {
        borderColor: color.gray100,
        color: color.gray120,
        item: {
            backgroundColor: color.blue110,
            color: color.white,

        }
    }
};

const textField = {
    borderRadius: '0px',
    borderSize: '1px',
    defaultWidth: 300,
    size: {
        xs: 10,
        s: 12,
        m: 14,
        l: 16,
        xl: 18
    },
    default: {
        default: {
            helperText: color.gray70,
            borderColor: color.gray60,
            color: color.gray120,
            placeholderColor: color.gray60
        },
        error: {
            errorText: color.error,
            borderColor: color.error,
        },
        hover: {
            borderColor: color.blue110
        },
        focus: {
            borderColor: color.gray100,
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

const _switch = {
    label: color.gray70,
    default: {
        backgroundColor: color.gray30,
        thumbColor: color.gray70
    },
    hover: {
        backgroundColor: color.gray50,
    },
    checked: {
        thumbColor: color.primary
    }
};

export default {
    checkbox,
    textField,
    switch: _switch,
    select
};
