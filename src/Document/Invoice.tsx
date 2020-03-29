import React from 'react';
import styled from 'styled-components';

interface ClientInfo {
    className?: string;
    company?: string;
    firstName: string;
    lastName: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
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
            <p>
                Tav. {firstName} {lastName}
            </p>
            <p>{address}</p>
            <p>
                {zipcode} {city}
            </p>
            <p>{country}</p>
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
}

export const InvoiceInfo = styled(
    ({ className, invoiceNumber, expirationDate, date }) => {
        return (
            <div className={className}>
                <p>factuurnummer {invoiceNumber}</p>
                <p>factuurdatum {date}</p>
                <p>vervaldatum {expirationDate}</p>
            </div>
        );
    }
)`
    p {
        margin: 0;
    }
    width: 100%;
`;
