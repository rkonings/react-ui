import React from 'react';
import styled from 'styled-components';

interface ContactInfo {
    className?: string;
    address: string;
    zipcode: string;
    city: string;
    phone: string;
    email: string;
}

const Title = styled.div`
    font-size: 120%;
    padding-bottom: 5px;
`;
const Address = styled.div``;
const ZipcodeCity = styled.div``;
const Phone = styled.div``;
const Email = styled.div``;

export const ContactInfo = styled(
    ({ className, address, zipcode, city, phone, email }: ContactInfo) => {
        return (
            <div className={className}>
                <Title>Contactgegevens</Title>
                <Address>{address}</Address>
                <ZipcodeCity>
                    {zipcode} {city}
                </ZipcodeCity>
                <Phone>T: {phone}</Phone>
                <Email>E: {email}</Email>
            </div>
        );
    }
)`
    ${Phone} {
        margin-top: 10px;
    }
`;
