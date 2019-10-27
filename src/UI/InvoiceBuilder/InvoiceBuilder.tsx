import React from 'react';
import styled from 'styled-components';
import { Grid, Item } from '../../Grid';
import Client from './Client';
import Company from './Company';
import { ClientData, CompanyData, ItemData } from './interfaces';
import Invoice from './Invoice';
import InvoiceInfo from './InvoiceInfo';

interface InvoiceBuilder {
    className?: string;
    items: ItemData[];
    client: ClientData;
    company: CompanyData;
    logo: string;
    dueDate: string;
    date: string;
    invoiceNumber: string;
}

const CompanyLogo = styled.img`
    margin-bottom: 50px;
    max-width: 100%;
`;

const PaymentInfo = styled.div`
    font-size: 12px;
    margin-top: auto;
    margin-bottom: 50px;
    align-self: center;
`;

const InvoiceBuilder = ({className, items, client, company, logo,
    dueDate, date, invoiceNumber}: InvoiceBuilder) => {
    return (
        <div className={className}>
            <Grid width="100%">
                <Item width="50%">
                    <CompanyLogo src={logo} />
                </Item>
                <Item horizontalAlignment="flex-end" width="50%">
                    <Company data={company} />
                </Item>
            </Grid>

            <Grid width="100%">
                <Item width="50%">
                    <Client data={client} />
                </Item>
                <Item width="50%" horizontalAlignment="flex-end">
                    <InvoiceInfo
                        dueDate={dueDate}
                        invoiceNumber={invoiceNumber}
                        date={date}
                    />
                </Item>
            </Grid>

            <Invoice items={items} />

            <PaymentInfo>
                {`Gaarne betaling voor de vervaldatum ${dueDate}  o.v.v. Factuurnummer ${invoiceNumber} op ons rekeningnummer`}
            </PaymentInfo>

        </div>
    );
};

export default styled(InvoiceBuilder)`
    display:flex;
    /* width: 800px; */
    flex-wrap: wrap;
    width: 210mm;
    height: 297mm;

    ${Invoice} {
        margin-top: 50px;
    }

    ${InvoiceInfo} {
        text-align: right;
    }

    ${Client} {
        width: 50%;
    }

    ${Company} {
        width: 50%;
        text-align: right;
    }
`;
