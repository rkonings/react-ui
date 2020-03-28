import React from 'react';
import styled from 'styled-components';
import CheckBox from '../Input/Checkbox/Checkbox';

export const Document = styled.div`
    align-items: flex-start;
    align-self: flex-start;
    * {
        box-sizing: border-box;
    }
`;

interface Page {
    background?: boolean;
    noMargin?: boolean;
}

export const Page = styled.div<Page>`
    font-size: 14px;
    width: 21cm;
    height: 28.7cm;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    /* padding: 4em 6em; */
    padding: 2em 4em;
    background: ${({ background = true }) => (background ? '#fdfdfd' : 'none')};
    /* margin-bottom: 10px; */
    /* border-bottom: 1px solid #000; */
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    font-size: 43px;
    font-weight: 600;
`;
export const Heading1 = styled.div`
    font-size: 18px;
    font-weight: 600;

    span {
        font-weight: 400;
    }
`;
export const Heading2 = styled.div`
    font-size: 16px;
    font-weight: 600;
`;
export const Heading3 = styled.div`
    font-size: 14px;
    font-weight: 600;
`;
export const Heading4 = styled.div`
    font-size: 14px;
`;
interface Margin {
    top?: number;
    bottom?: number;
}

const Margin = ({ top = 0, bottom = 0 }: Margin) => `
  margin-top: ${top}em;
  margin-bottom: ${bottom}em;
`;

export const Row = styled.div<Margin>`
    display: flex;
    flex-direction: row;
    ${Margin}
`;
interface Col {
    align?: string;
}
export const Col = styled.div<Col>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: ${({ align = 'flex-start' }) => align};
`;
export const Logo = styled.div``;

interface FrontPage {
    title: string;
    company: JSX.Element | string;
    client: string;
    date: string;
    expirationDate: string;
    reference: string;
    className?: string;
}
export const FrontPage = styled(
    ({
        className,
        title,
        company,
        client,
        date,
        expirationDate,
        reference,
    }: FrontPage) => {
        return (
            <Page className={className}>
                <Logo>{company}</Logo>
                <Title>{title}</Title>
                <Row>
                    <Col>
                        <Heading3>Klant</Heading3>
                        <div>t.a.v. {client}</div>
                    </Col>
                    <Col align="flex-end">
                        <Heading3>Offerte referentie</Heading3>
                        <div>{reference}</div>
                        <Heading3>Datum</Heading3>
                        <div>{date}</div>
                        <Heading3>Verval datum</Heading3>
                        <div>{expirationDate}</div>
                    </Col>
                </Row>
            </Page>
        );
    }
)`
    display: flex;
    flex-direction: column;

    ${Logo} {
        margin-top: 50%;
        margin-bottom: 2em;
    }

    ${Row} {
        margin-top: auto;
    }
`;

interface ContactInfoPage {
    className?: string;
    companyName: string;
    CoC: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    contactName: string;
    email: string;
    phone: string;
    RSIN: string;
    IBAN: string;
    BIC: string;
}

export const ContactInfoPage = styled(
    ({
        className,
        companyName,
        CoC,
        address,
        zipcode,
        city,
        country,
        contactName,
        email,
        phone,
        RSIN,
        IBAN,
        BIC,
    }: ContactInfoPage) => {
        return (
            <Page className={className}>
                <Row top={10}>
                    <Col>
                        <Heading3>{companyName}</Heading3>
                        <div>KvK {CoC}</div>
                    </Col>
                </Row>
                <Row top={5}>
                    <Col>
                        <Heading3>Adres</Heading3>
                        <div>{address}</div>
                        <div>
                            {zipcode} {city}
                        </div>
                        <div>{country}</div>
                    </Col>
                </Row>
                <Row top={5}>
                    <Col>
                        <Heading3>Contact</Heading3>
                        <div>{contactName}</div>
                    </Col>
                    <Col>
                        <div>{email}</div>
                        <div>{phone}</div>
                    </Col>
                </Row>
                <Row top={5}>
                    <Col>
                        <Heading3>Bankgegevens</Heading3>
                        <div>IBAN: {IBAN}</div>
                        <div>BIC: {BIC}</div>
                    </Col>
                </Row>
            </Page>
        );
    }
)``;

export const Table = styled.table`
    width: 100%;
    margin-top: 1em;

    td {
        vertical-align: top;
    }

    .amount {
        text-align: left;
        width: 100px;
    }
    .description {
        text-align: left;

        span {
            font-size: 80%;
        }
    }

    .unit-price {
        text-align: right;
    }

    .price {
        text-align: right;
        width: 75px;
    }

    .currency {
        width: 50px;
        text-align: right;
    }
`;

export const TableTotals = styled.table`
    width: 100%;
    margin-top: 2em;

    td {
        vertical-align: top;
    }

    .amount {
        text-align: left;
        width: 100px;
    }
    .description {
        text-align: left;

        span {
            font-size: 80%;
        }
    }

    .label {
        text-align: right;
        width: 100px;
    }

    .amount {
        text-align: right;
        width: 75px;
    }

    .currency {
        width: 50px;
        text-align: right;
    }

    .tax {
        td {
            padding-bottom: 0.5em;
        }
    }

    .total {
        font-weight: 600;
        .label,
        .currency,
        .amount {
            padding-top: 1em;
            border-top: 1px solid #000;
        }
    }
`;

interface OfferConformation {
    className?: string;
}
interface ConformationOption {
    className?: string;
    title: string;
    price: string;
}

const ConformationOption = styled(
    ({ className, title, price }: ConformationOption) => {
        return (
            <div className={className}>
                <CheckBox
                    // type={type as Type}
                    size="xl"
                    // label={label}
                    // onChange={() => {})}
                    checked={false}
                />
                <div>
                    <div className="title">{title}</div>
                    <div className="price">&euro; {price} incl BTW</div>
                </div>
            </div>
        );
    }
)`
    display: flex;
    align-items: center;

    ${CheckBox} {
        margin-right: 2em;
    }

    margin: 1em 0;

    .price {
        font-size: 80%;
    }
`;

export const OfferConformation = styled(({ className }: OfferConformation) => {
    return (
        <div className={className}>
            <Heading3>Keuze</Heading3>
            <ConformationOption
                price="7360,12"
                title="KIT R32 14kW PACi Cassette 90x90"
            />
            <ConformationOption
                price="7360,12"
                title="KIT R32 14kW PACi Cassette 90x90"
            />
            <Heading4>Vink uw keuze(s) aan</Heading4>
        </div>
    );
})`
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    padding: 2em;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 2em;
`;
interface Signature {
    className?: string;
    label: string;
}

const SignatureBox = styled.div`
    border-bottom: 1px solid #000;
    width: 100%;
    height: 75px;
    box-sizing: border-box;
    margin-bottom: 0.5em;
`;
export const Signature = styled(({ className, label }: Signature) => {
    return (
        <div className={className}>
            <div>{label}</div>
            <SignatureBox />
            <div>handtekening</div>
        </div>
    );
})`
    width: 90%;
`;
