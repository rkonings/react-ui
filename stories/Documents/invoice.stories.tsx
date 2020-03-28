import { storiesOf } from '@storybook/react';
import React from 'react';

import * as Element from '../../src/Document/Elements';
import * as Invoice from '../../src/Document/Invoice';
import Logo from '../../src/Document/Logo';
import Specifications from '../../src/Document/Specifications';

storiesOf('documents', module).add('Invoice', () => {
    const workDays = [
        {
            date: '02/03/2020',
            project: 'Leerdam',
            mechanic: 'L. Robben',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '35,00',
        },
        {
            date: '02/03/2020',
            project: 'Leerdam',
            mechanic: 'C. Robben',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '35,00',
        },
        {
            date: '02/03/2020',
            project: 'Leerdam',
            mechanic: 'T. Dekker',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '40,00',
        },
        {
            date: '03/03/2020',
            project: 'Leerdam',
            mechanic: 'L. Robben',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '35,00',
        },
        {
            date: '03/03/2020',
            project: 'Leerdam',
            mechanic: 'C. Robben',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '35,00',
        },
        {
            date: '03/03/2020',
            project: 'Leerdam',
            mechanic: 'T. Dekker',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '40,00',
        },
        {
            date: '04/03/2020',
            project: 'Leerdam',
            mechanic: 'L. Robben',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '35,00',
        },
        {
            date: '04/03/2020',
            project: 'Leerdam',
            mechanic: 'C. Robben',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '35,00',
        },
        {
            date: '04/03/2020',
            project: 'Leerdam',
            mechanic: 'T. Dekker',
            time: '7:00 - 17:00',
            pause: '1',
            hours: '8',
            hourRate: '40,00',
        },
    ];

    return (
        <Element.Document>
            <Element.Page background={false}>
                <Element.Row>
                    <Element.Col>
                        <Invoice.CompanyLogo>
                            <Logo />
                        </Invoice.CompanyLogo>
                    </Element.Col>
                </Element.Row>
                <Element.Row>
                    <Element.Col>
                        <Invoice.ClientInfo
                            company="De Ruijter airco-service"
                            firstName="Cees"
                            lastName="de Ruijter"
                            address="kerkplein 5"
                            zipcode="4231 BK"
                            city="Meerkerk"
                            country="Nederland"
                        />
                        <Invoice.InvoiceInfo
                            invoiceNumber="202004001"
                            date="01/04/2020"
                            expirationDate="14/04/2020"
                        />
                    </Element.Col>
                    <Element.Col>
                        <Invoice.CompanyInfo
                            address="Toermalijnlaan 40"
                            zipcode="3523 BH"
                            city="Utrecht"
                            country="Nederland"
                            CoC="77638425"
                            tax="861074956"
                            bank="NL98 BUNQ 2042 5806 51"
                            phone="+31 (0)30 22 705 75"
                            email="info@novaclima.nl"
                            website="www.novaclima.nl"
                        />
                    </Element.Col>
                </Element.Row>
                <Element.Row top={4}>
                    <Element.Col>
                        <Element.Heading1>
                            Factuur <span> | 202004001</span>
                        </Element.Heading1>
                        <Element.Table>
                            <thead>
                                <tr>
                                    <th className="amount">aantal</th>
                                    <th className="description">
                                        omschrijving
                                    </th>
                                    <th className="currency" />
                                    <th className="unit-price">stukprijs</th>
                                    <th className="currency" />
                                    <th className="price">prijs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="amount">171</td>
                                    <td className="description">
                                        Leerdam - koeltechnische werkzaamheden
                                        <br />
                                        <span>171 uur | uurtarief €40,00 </span>
                                    </td>
                                    <td className="currency">&euro;</td>
                                    <td className="unit-price">40,00</td>
                                    <td className="currency">&euro;</td>
                                    <td className="price">6.840,00</td>
                                </tr>
                            </tbody>
                        </Element.Table>
                        <Element.TableTotals>
                            <tr className="subtotal">
                                <td>&nbsp;</td>
                                <td className="label">subtotal</td>
                                <td className="currency">&euro;</td>
                                <td className="amount">6.840,00</td>
                            </tr>
                            <tr className="tax">
                                <td>&nbsp;</td>
                                <td className="label">BTW (21%)</td>
                                <td className="currency">&euro;</td>
                                <td className="amount">1.436,40</td>
                            </tr>
                            <tr className="total">
                                <td>&nbsp;</td>
                                <td className="label">totaal</td>
                                <td className="currency">&euro;</td>
                                <td className="amount">8.276,40</td>
                            </tr>
                        </Element.TableTotals>
                    </Element.Col>
                </Element.Row>
                <Element.Row top={5}>
                    <Element.Col>
                        <p>
                            Gelieve uw (restant)betaling (€ 8.276,40) binnen 14
                            dagen te voldoen op bankrekeningnummer
                            <br /> NL98 BUNQ 2042 5806 51 t.n.v. Nova Clima
                            o.v.v.202003001.
                        </p>
                        <p>
                            Voor vragen over deze factuur kunt u contact opnemen
                            via
                            <br /> administratie@novaclima.nl / +31(0)30 22 705
                            75
                        </p>
                    </Element.Col>
                </Element.Row>
            </Element.Page>
            <Element.Page background={false}>
                <Element.Row>
                    <Element.Col>
                        <Invoice.CompanyLogo>
                            <Logo />
                        </Invoice.CompanyLogo>
                    </Element.Col>
                </Element.Row>
                <Element.Row>
                    <Element.Col>
                        <Element.Heading1>
                            Specificaties <span> | Project Leerdam</span>
                        </Element.Heading1>
                    </Element.Col>
                </Element.Row>
                <Element.Row>
                    <Element.Col>
                        <Specifications workDays={workDays} />
                    </Element.Col>
                </Element.Row>
            </Element.Page>
        </Element.Document>
    );
});
