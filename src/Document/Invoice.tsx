import React from 'react';
import styled from 'styled-components';
import NumberFormatter from '../../src/Formatter/NumberFormatter';

interface ClientInfo {
    className?: string;
    company?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    zipcode?: string;
    city?: string;
    country?: string;
}

export const ClientInfo = styled(
    ({
        className,
        company,
        firstName,
        lastName,
        address,
        zipcode,
        city,
        country,
    }: ClientInfo) => (
        <div className={className}>
            {company && <p>{company}</p>}
            {firstName && (
                <p>
                    Tav. {firstName} {lastName}
                </p>
            )}
            {address && <p>{address}</p>}
            {(zipcode || city) && (
                <p>
                    {zipcode} {city}
                </p>
            )}
            {country && <p>{country}</p>}
        </div>
    )
)`
    p {
        margin: 0;
    }

    margin-bottom: 2em;
`;

export const CompanyLogo = styled.div`
    text-align: right;
    width: 100%;
    font-size: 28px;
    margin-bottom: 1em;
    svg {
        width: 250px;
    }
`;

interface CompanyInfo {
    className?: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    phone: string;
    website: string;
    email: string;
    bank: string;
    CoC: string;
    tax: string;
}

const CompanyContactInfo = styled.div`
    margin: 1em 0;
`;

export const CompanyInfo = styled(
    ({
        className,
        address,
        zipcode,
        city,
        country,
        phone,
        website,
        email,
        bank,
        CoC,
        tax,
    }: CompanyInfo) => {
        return (
            <div className={className}>
                <p>{address}</p>
                <p>
                    {zipcode} {city}
                </p>
                <p>{country}</p>
                <CompanyContactInfo>
                    <p>{phone}</p>
                    <p>{email}</p>
                    <p>{website}</p>
                </CompanyContactInfo>
                <p>Bank {bank}</p>
                <p>KvK {CoC}</p>
                <p>BTW/RSIN {tax}</p>
            </div>
        );
    }
)`
    p {
        margin: 0;
    }

    margin-bottom: 2em;
    width: 100%;
    text-align: right;
`;

interface InvoiceInfo {
    className?: string;
    invoiceNumber: string;
    expirationDate: string;
    date: string;
    downpaymentInvoice?: boolean;
    discount: number;
}

export const InvoiceInfo = styled(
    ({ className, invoiceNumber, expirationDate, date }) => {
        return (
            <div className={className}>
                <p>
                    <span>factuurnummer</span> {invoiceNumber}
                </p>
                <p>
                    <span>factuurdatum</span> {date}
                </p>
                <p>
                    <span>vervaldatum</span> {expirationDate}
                </p>
            </div>
        );
    }
)`
    p {
        margin: 0;
    }
    span {
        display: inline-block;
        width: 120px;
        font-weight: 600;
    }
    width: 100%;
`;

const getSubTotal = (invoiceLines: InvoiceLine[]) => {
    return invoiceLines.reduce(
        (price, line) => price + (line.amount * line.price) / 100,
        0
    );
};

interface SubTotal {
    invoiceLines: InvoiceLine[];
    discount?: number;
}

type Tax = SubTotal;
type Total = SubTotal;
type SubTotalWithDiscount = SubTotal;

export const SubTotal = ({ invoiceLines }: SubTotal) => {
    const subTotal = getSubTotal(invoiceLines);
    return <NumberFormatter value={subTotal} type="currency" />;
};

export const SubTotalWithDiscount = ({
    invoiceLines,
    discount,
}: SubTotalWithDiscount) => {
    const subTotal = getSubTotal(invoiceLines);
    return <NumberFormatter value={subTotal} type="currency" />;
};

export const Tax = ({ invoiceLines }: Tax) => {
    const subTotal = getSubTotal(invoiceLines);
    const tax = subTotal * 0.21;
    return <NumberFormatter value={tax} type="currency" />;
};
export const Total = ({ invoiceLines }: Total) => {
    const subTotal = getSubTotal(invoiceLines);
    const total = subTotal * 1.21;
    return <NumberFormatter value={total} type="currency" />;
};

export interface InvoiceLine {
    amount: number;
    description: string | JSX.Element;
    price: number;
    className?: string;
}

export const InvoiceLine = styled(
    ({ className, amount, description, price }: InvoiceLine) => {
        return (
            <tr className={className}>
                <td className="amount">{amount}</td>
                <td className="description">{description}</td>
                <td className="currency">&euro;</td>
                <td className="unit-price">
                    <NumberFormatter type="currency" value={price / 100} />
                </td>
                <td className="currency">&euro;</td>
                <td className="price">
                    {
                        <NumberFormatter
                            type="currency"
                            value={(price * amount) / 100}
                        />
                    }
                </td>
            </tr>
        );
    }
)``;
