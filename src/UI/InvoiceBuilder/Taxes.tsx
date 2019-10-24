import React from 'react';
import styled from 'styled-components';
import { NumberFormatter } from '../../Formatter/index';
import { ItemData } from './interfaces';

interface Taxes {
    className?: string;
    items: ItemData[];
}

export const calculateTotalTaxes = (items: ItemData[]) => {
    return items.reduce((total, item) => {
        return total += item.tax * item.price * item.quantity / 100;
    }, 0);
};

const calculateTaxes = (items: ItemData[]) => {
    return items.reduce((taxes, item) => {
        const itemTaxes = item.price * item.tax / 100;
        if (!taxes.has(item.tax)) {
            taxes.set(item.tax, itemTaxes);
        } else {
            taxes.set(item.tax, taxes.get(item.tax) + itemTaxes);
            taxes[item.tax] = taxes[item.tax] + itemTaxes;
        }

        return taxes;
    }, new Map());
};

interface TaxesLine {
    className?: string;
    tax: number;
    amount: number;
}

const TaxesLine = styled(({className, tax, amount}: TaxesLine) => {
    return (
        <div className={className}>{tax}% - <NumberFormatter value={amount} type="currency" /></div>
    );
})`
    ${({theme: { color }}) => {
        return `
            color: ${color};
            font-size: 14px;
            padding: 1em;
            border-bottom: 1px solid ${color.gray60};
        `;
    }}
`;

const Taxes = ({className, items}: Taxes) => {
    return (
        <div className={className}>
            <NumberFormatter value={calculateTotalTaxes(items)} type="currency" />
        </div>
    );
    // const taxes = calculateTaxes(items);
    // return (
    //     <div className={className}>
    //         {Array.from( taxes ).map(([key, value]) => (
    //             <TaxesLine key={key} tax={parseInt(key, 10)} amount={value} />
    //         )) }
    //     </div>
    // );
};

export default styled(Taxes)``;
