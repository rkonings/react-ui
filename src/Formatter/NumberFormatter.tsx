import React from 'react';
import Number from './Number';

type NumberType = 'currency';

interface NumberFormatter {
    value: number;
    type?: NumberType;
    short?: boolean;
}

export const numberFormatter = ({value, type, short = false}: NumberFormatter) => {
    const options = {
        average: short,
        thousandSeparated: true,
    };
    if (type === 'currency') {
        return Number(value).format({ ...options, mantissa: 2 });
    }
    return Number(value).format(options);
};

const NumberFormatter = (props: NumberFormatter) => {
    return (
        <span>{numberFormatter(props)}</span>
    );
};

export default NumberFormatter;
