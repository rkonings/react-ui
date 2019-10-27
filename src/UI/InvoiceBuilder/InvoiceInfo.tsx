import React from 'react';
import styled from 'styled-components';

interface InvoiceInfo {
    className?: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
}

const InvoiceInfo = ({className, invoiceNumber, date, dueDate}: InvoiceInfo) => {

    return (
        <div className={className}>
            <ul>
                <li>invoice number: {invoiceNumber}</li>
                <li>invoice date: {date}</li>
                <li>due date: {dueDate}</li>

            </ul>
        </div>
    );
};

export default styled(InvoiceInfo)`
    color: ${({theme: { color }}) => color.gray90};
    ul {
        list-style: none;
        margin-left:0;
        padding-left:0;
        font-size: 12px;
    }
`;
