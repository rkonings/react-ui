const blue = {
    blue: '#172B99',
    blue10: '#F2F9FF',
    blue20: '#D3EBFE',
    blue30: '#B5DBFD',
    blue40: '#7AB7F9',
    blue50: '#4993F2',
    blue60: '#2373E9',
    blue70: '#0758DD',
    blue80: '#004ACD',
    blue90: '#0040B8',
    blue100: '#0036A0',
    blue110: '#002D87',
};

const orange = {
    orange: '#993414',
    orange10: '#FDF4F1',
    orange20: '#FADFD6',
    orange30: '#F6CABB',
    orange40: '#EF9F85',
    orange50: '#E97853',
    orange60: '#E4582B',
    orange70: '#CB461A',
    orange80: '#B53E17',
    orange90: '#A33815',
    orange100: '#8C3012',
    orange110: '#75280F'
};

const gray = {
    gray: '#858B8E',
    gray10: '#FEFCFC',
    gray20: '#F7F7F7',
    gray30: '#F5F2F2',
    gray40: '#EEEEEE',
    gray50: '#DEDEDE',
    gray60: '#D1D0D0',
    gray70: '#B1ADAD',
    gray80: '#858B8E',
    gray90: '#5E696E',
    gray100: '#475359',
    gray110: '#34444C',
    gray120: '#263238',
    gray130: '#1B2327'
};

const color = {
    white: '#FFF',
    black: '#1B2327',
    error: '#F62113',
    primary: blue.blue80,
    secondairy: orange.orange60,
    ...blue,
    ...orange,
    ...gray,
    green: {
        light: '#30BE76'
    }
};

export default color;
