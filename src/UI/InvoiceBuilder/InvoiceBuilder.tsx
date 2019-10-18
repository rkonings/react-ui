import React from 'react';
import styled from 'styled-components';
import { ItemData } from './interfaces';
import Invoice from './Invoice';

interface InvoiceBuilder {
    className?: string;
    items: ItemData[];
}
const InvoiceBuilder = ({className, items}: InvoiceBuilder) => {
    return (
        <div className={className}>
            <Invoice items={items} />
        </div>
    );
};

export default styled(InvoiceBuilder)`

`;
