import React from 'react';
import styled from 'styled-components';
import { NumberFormatter } from '../../Formatter/index';
import { ItemData } from './interfaces';

interface Total {
    items: ItemData[];
    className?: string;
    excludeTaxes?: boolean;
}

const calculateTotal = (items: ItemData[], excludeTaxes: boolean = false) => {
    return items.reduce((total, item) => {
        if (excludeTaxes) {
            return total + (item.price * item.quantity);
        }
        return total + (item.price * item.quantity * (100 + item.tax) / 100);
    }, 0);
};

const Total = ({className, items, excludeTaxes}: Total) => {
    return (
        <div className={className}>
            <NumberFormatter value={calculateTotal(items, excludeTaxes)} type="currency" />
        </div>
    );
};

export default styled(Total)``;
