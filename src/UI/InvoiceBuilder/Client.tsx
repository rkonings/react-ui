import React from 'react';
import styled from 'styled-components';
import { ClientData } from './interfaces';

interface Client {
    className?: string;
    data: ClientData;
}

const Client = ({className, data}: Client) => {

    const { firstName, lastName, companyName, address, zipcode, city } = data;

    return (
        <div className={className}>
            <ul>
                <li>{firstName} {lastName}</li>
                <li>{companyName}</li>
                <li>{address}</li>
                <li>{zipcode}, {city}</li>
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
        font-size: 12px;
    }
`;
