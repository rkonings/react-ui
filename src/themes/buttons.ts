import color from './colors';

const Button = {
    fontWeight: 500,
    default: {
        default: {
            background: color.gray20,
            color: color.black,
            ghostColor: color.gray100,
        },
        hover: {
            background: color.gray50,
            border: color.gray50,
            ghostColor: color.gray100,
            ghostBackground: color.gray10,
        }

    },
    primary: {
        default: {
            background: color.blue80,
            color: color.white,
            ghostColor: color.blue80,
        },
        hover: {
            background: color.blue100,
            border: color.blue100,
            ghostColor: color.blue110,
            ghostBackground: color.blue10,
        }

    },
    secondairy: {
        default: {
            background: color.orange80,
            color: color.white,
            ghostColor: color.orange80,
        },
        hover: {
            background: color.orange100,
            border: color.orange100,
            ghostColor: color.orange110,
            ghostBackground: color.orange10,
        }

    }
};

export default Button;
