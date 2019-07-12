const color = {
    white: '#FFFFFF',
    gray: {
        lighter: 'hsla(213, 24%, 93%,1)',
        light: 'hsla(197, 10%, 87%,1)',
        dark: 'hsl(211, 11%, 63%)',
        darker: 'hsla(180, 3%, 19%)',
    },
    green: {
        light: '#30BE76'
    }
};

const theme = {
    base: {
        fontFamily: 'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    button : {
        default: {
            default: {
                background: color.green.light,
                color: color.white
            },
            hover: {
                color: color.gray.darker,
                background: color.gray.lighter,
                border: color.gray.dark,
            }

        }

    }
};

export default theme;
