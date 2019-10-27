import React from 'react';
import styled from 'styled-components';
import { CompanyData } from './interfaces';

interface Company {
    className?: string;
    data: CompanyData;
}

const Client = ({className, data}: Company) => {

    const { name, address, zipcode, city, email, phone, website, vatNumber, bankAccount, coc } = data;

    return (
        <div className={className}>
            <ul>
                <li>{name}</li>
                <li>{address}</li>
                <li>{zipcode}</li>
                <li>{city}</li>
            </ul>

            <ul>
                <li>email: {email}</li>
                <li>phone: {phone}</li>
                <li>website: {website}</li>
            </ul>

            <ul>
                <li>vat number: {vatNumber}</li>
                <li>bank account: {bankAccount}</li>
                <li>C.o.C number: {coc}</li>
            </ul>
        </div>
    );
};

export default styled(Client)`
    color: ${({theme: { color }}) => color.gray90};
    ul {
        list-style: none;
        margin-left:0;
        padding-left:0;
        margin-bottom: 20px;
        font-size: 12px;
    }
`;
