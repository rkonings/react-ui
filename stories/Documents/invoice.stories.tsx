import { storiesOf } from '@storybook/react';
import React from 'react';

import * as Element from '../../src/Document/Elements';
import * as Invoice from '../../src/Document/Invoice';
import { InvoiceLine, SubTotal, Tax, Total } from '../../src/Document/Invoice';
import Logo from '../../src/Document/Logo';
import Specifications, {
    getWorkdaysInvoiceLines,
} from '../../src/Document/Specifications';

storiesOf('documents', module)
    .add('Invoice - EHBI group', () => {
        const workDays = [
            {
                date: '17/03/2020',
                project: 'werkzaamheden EHES20041',
                mechanic: 'C. Robben',
                time: '7:00 - 16:15',
                hours: '8.25',
                hourRate: '35,00',
            },
        ];

        const clientInfo = {
            company: 'EHBI Group',
            address: 'Nijverheidsweg 8A',
            zipcode: '3381 LM',
            city: 'Giessenburg',
            country: 'Nederland',
        };

        const invoiceInfo = {
            invoiceNumber: '202004001',
            date: '01/04/2020',
            expirationDate: '14/04/2020',
        };

        const companyInfo = {
            address: 'Toermalijnlaan 40',
            zipcode: '3523 BH',
            city: 'Utrecht',
            country: 'Nederland',
            CoC: '77 638 425',
            tax: '8610.74.956',
            bank: 'NL98 BUNQ 2042 5806 51',
            phone: '+31 (0)30 22 705 75',
            email: 'info@novaclima.nl',
            website: 'www.novaclima.nl',
            name: 'Nova Clima',
            administrationEmail: 'administratie@novaclima.nl',
        };

        const invoiceLines = [
            {
                amount: 8.25,
                price: 3500,
                description: (
                    <div>
                        werkzaamheden EHES20041
                        <br />
                        <span>8,25 uur | uurtarief €35,00 </span>
                    </div>
                ),
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
                            <Invoice.ClientInfo {...clientInfo} />
                            <Invoice.InvoiceInfo {...invoiceInfo} />
                        </Element.Col>
                        <Element.Col>
                            <Invoice.CompanyInfo {...companyInfo} />
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={4}>
                        <Element.Col>
                            <Element.Heading1>
                                Factuur{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
                            </Element.Heading1>
                            <Element.Table>
                                <thead>
                                    <tr>
                                        <th className="amount">aantal</th>
                                        <th className="description">
                                            omschrijving
                                        </th>
                                        <th className="currency" />
                                        <th className="unit-price">
                                            stukprijs
                                        </th>
                                        <th className="currency" />
                                        <th className="price">prijs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceLines.map((line, index) => (
                                        <InvoiceLine key={index} {...line} />
                                    ))}
                                </tbody>
                            </Element.Table>
                            <Element.TableTotals>
                                <tr className="subtotal">
                                    <td>&nbsp;</td>
                                    <td className="label">subtotal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <SubTotal invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="tax">
                                    <td>&nbsp;</td>
                                    <td className="label">BTW (21%)</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Tax invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="total">
                                    <td>&nbsp;</td>
                                    <td className="label">totaal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Total invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                            </Element.TableTotals>
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={5}>
                        <Element.Col>
                            <p>
                                Gelieve uw (restant)betaling (€{' '}
                                {<Total invoiceLines={invoiceLines} />}) binnen
                                14 dagen te voldoen op bankrekeningnummer
                                <br /> {companyInfo.bank} t.n.v.{' '}
                                {companyInfo.name}
                                o.v.v. {invoiceInfo.invoiceNumber}.
                            </p>
                            <p>
                                Voor vragen over deze factuur kunt u contact
                                opnemen via
                                <br /> {companyInfo.administrationEmail} /{' '}
                                {companyInfo.phone}
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
                                Specificaties{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
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
    })
    .add('Invoice - Cees', () => {
        const workDays = [
            {
                date: '18/03/2020',
                project: 'Leerdam',
                mechanic: 'L. Robben',
                time: '7:00 - 17:15',
                pause: '1',
                hours: '9,25',
                hourRate: '35,00',
            },
            {
                date: '18/03/2020',
                project: 'Leerdam',
                mechanic: 'C. Robben',
                time: '7:00 - 17:15',
                pause: '1',
                hours: '9,25',
                hourRate: '35,00',
            },
            {
                date: '18/03/2020',
                project: 'Leerdam',
                mechanic: 'T. Dekker',
                time: '7:00 - 17:15',
                pause: '1',
                hours: '9,25',
                hourRate: '42,50',
            },
            {
                date: '19/03/2020',
                project: 'Leerdam',
                mechanic: 'L. Robben',
                time: '7:30 - 16:30',
                pause: '1',
                hours: '8',
                hourRate: '35,00',
            },
            {
                date: '19/03/2020',
                project: 'Leerdam',
                mechanic: 'C. Robben',
                time: '7:30 - 16:30',
                pause: '1',
                hours: '8',
                hourRate: '35,00',
            },
            {
                date: '19/03/2020',
                project: 'Leerdam',
                mechanic: 'T. Dekker',
                time: '7:30 - 16:30',
                pause: '1',
                hours: '8',
                hourRate: '42,50',
            },
            {
                date: '20/03/2020',
                project: 'Leerdam',
                mechanic: 'L. Robben',
                time: '7:30 - 16:30',
                pause: '1',
                hours: '8',
                hourRate: '35,00',
            },
            {
                date: '20/03/2020',
                project: 'Leerdam',
                mechanic: 'C. Robben',
                time: '7:30 - 16:30',
                pause: '1',
                hours: '8',
                hourRate: '35,00',
            },
            {
                date: '20/03/2020',
                project: 'Leerdam',
                mechanic: 'T. Dekker',
                time: '7:30 - 16:30',
                pause: '1',
                hours: '8',
                hourRate: '42,50',
            },
            {
                date: '23/03/2020',
                project: 'Leerdam',
                mechanic: 'L. Robben',
                time: '7:30 - 17:00',
                pause: '1',
                hours: '8,5',
                hourRate: '35,00',
            },
            {
                date: '23/03/2020',
                project: 'Leerdam',
                mechanic: 'C. Robben',
                time: '7:30 - 17:00',
                pause: '1',
                hours: '8,5',
                hourRate: '35,00',
            },
            {
                date: '23/03/2020',
                project: 'Leerdam',
                mechanic: 'T. Dekker',
                time: '7:30 - 17:00',
                pause: '1',
                hours: '8,5',
                hourRate: '42,50',
            },
            {
                date: '24/03/2020',
                project: 'Leerdam',
                mechanic: 'L. Robben',
                time: '7:30 - 16:00',
                pause: '1',
                hours: '7,5',
                hourRate: '35,00',
            },
            {
                date: '24/03/2020',
                project: 'Leerdam',
                mechanic: 'C. Robben',
                time: '7:30 - 16:00',
                pause: '1',
                hours: '7,5',
                hourRate: '35,00',
            },
            {
                date: '24/03/2020',
                project: 'Leerdam',
                mechanic: 'T. Dekker',
                time: '7:30 - 16:00',
                pause: '1',
                hours: '7,5',
                hourRate: '42,50',
            },
            {
                date: '25/03/2020',
                project: 'Leerdam',
                mechanic: 'L. Robben',
                time: '7:30 - 16:15',
                pause: '1',
                hours: '7,75',
                hourRate: '35,00',
            },
            {
                date: '25/03/2020',
                project: 'Leerdam',
                mechanic: 'T. Dekker',
                time: '7:30 - 16:15',
                pause: '1',
                hours: '7,75',
                hourRate: '42,50',
            },
            {
                date: '26/03/2020',
                project: 'Leerdam',
                mechanic: 'L. Robben',
                time: '7:30 - 16:15',
                pause: '1',
                hours: '7,75',
                hourRate: '35,00',
            },
            {
                date: '26/03/2020',
                project: 'Leerdam',
                mechanic: 'T. Dekker',
                time: '7:30 - 16:15',
                pause: '1',
                hours: '7,75',
                hourRate: '42,50',
            },
        ];

        const clientInfo = {
            company: 'De Ruijter airco-service',
            firstName: 'Cees',
            lastName: 'de Ruijter',
            address: 'kerkplein 5',
            zipcode: '4231 BK',
            city: 'Meerkerk',
            country: 'Nederland',
        };

        const invoiceInfo = {
            invoiceNumber: '202004003',
            date: '01/04/2020',
            expirationDate: '14/04/2020',
        };

        const companyInfo = {
            address: 'Toermalijnlaan 40',
            zipcode: '3523 BH',
            city: 'Utrecht',
            country: 'Nederland',
            CoC: '77 638 425',
            tax: '8610.74.956',
            bank: 'NL98 BUNQ 2042 5806 51',
            phone: '+31 (0)30 22 705 75',
            email: 'info@novaclima.nl',
            website: 'www.novaclima.nl',
            name: 'Nova Clima',
            administrationEmail: 'administratie@novaclima.nl',
        };

        const invoiceLines = getWorkdaysInvoiceLines(workDays);

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
                            <Invoice.ClientInfo {...clientInfo} />
                            <Invoice.InvoiceInfo {...invoiceInfo} />
                        </Element.Col>
                        <Element.Col>
                            <Invoice.CompanyInfo {...companyInfo} />
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={4}>
                        <Element.Col>
                            <Element.Heading1>
                                Factuur{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
                            </Element.Heading1>
                            <Element.Table>
                                <thead>
                                    <tr>
                                        <th className="amount">aantal</th>
                                        <th className="description">
                                            omschrijving
                                        </th>
                                        <th className="currency" />
                                        <th className="unit-price">
                                            stukprijs
                                        </th>
                                        <th className="currency" />
                                        <th className="price">prijs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceLines.map((line, index) => (
                                        <InvoiceLine key={index} {...line} />
                                    ))}
                                </tbody>
                            </Element.Table>
                            <Element.TableTotals>
                                <tr className="subtotal">
                                    <td>&nbsp;</td>
                                    <td className="label">subtotal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <SubTotal invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="tax">
                                    <td>&nbsp;</td>
                                    <td className="label">BTW (21%)</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Tax invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="total">
                                    <td>&nbsp;</td>
                                    <td className="label">totaal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Total invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                            </Element.TableTotals>
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={5}>
                        <Element.Col>
                            <p>
                                Gelieve uw (restant)betaling (€{' '}
                                {<Total invoiceLines={invoiceLines} />}) binnen
                                14 dagen te voldoen op bankrekeningnummer
                                <br /> {companyInfo.bank} t.n.v.{' '}
                                {companyInfo.name}
                                o.v.v. {invoiceInfo.invoiceNumber}.
                            </p>
                            <p>
                                Voor vragen over deze factuur kunt u contact
                                opnemen via
                                <br /> {companyInfo.administrationEmail} /{' '}
                                {companyInfo.phone}
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
                                Specificaties{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
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
    })
    .add('Invoice - Airco partners', () => {
        const workDays = [
            {
                date: '02/03/2020',
                project: 'Katwijk demontage',
                mechanic: 'L. Robben',
                time: '7:30 - 15:00',
                pause: '0.5',
                hours: '7',
                hourRate: '35,00',
            },
            {
                date: '02/03/2020',
                project: 'Katwijk demontage',
                mechanic: 'C. Robben',
                time: '7:30 - 15:00',
                pause: '0.5',
                hours: '7',
                hourRate: '35,00',
            },
            {
                date: '03/03/2020',
                project: 'June, Oegstgeest',
                mechanic: 'L. Robben',
                time: '7:45 - 18:30',
                pause: '0.75',
                hours: '10',
                hourRate: '35,00',
            },
            {
                date: '03/03/2020',
                project: 'June, Oegstgeest',
                mechanic: 'C. Robben',
                time: '7:45 - 18:30',
                pause: '0.75',
                hours: '10',
                hourRate: '35,00',
            },
        ];

        const clientInfo = {
            company: 'Airco Partners',
            address: 'Ammerzoden 9',
            zipcode: '2181 LX',
            city: 'Hillegom',
            country: 'Nederland',
        };

        const invoiceInfo = {
            invoiceNumber: '202004004',
            date: '01/04/2020',
            expirationDate: '14/04/2020',
            downpaymentInvoice: true,
        };

        const companyInfo = {
            address: 'Toermalijnlaan 40',
            zipcode: '3523 BH',
            city: 'Utrecht',
            country: 'Nederland',
            CoC: '77 638 425',
            tax: '8610.74.956',
            bank: 'NL98 BUNQ 2042 5806 51',
            phone: '+31 (0)30 22 705 75',
            email: 'info@novaclima.nl',
            website: 'www.novaclima.nl',
            name: 'Nova Clima',
            administrationEmail: 'administratie@novaclima.nl',
        };

        const invoiceLines = [
            {
                amount: 14,
                price: 3500,
                description: (
                    <div>
                        werkzaamheden Katwijk demontage
                        <br />
                        <span>14 uur | uurtarief €35,00 </span>
                    </div>
                ),
            },
            {
                amount: 20,
                price: 3500,
                description: (
                    <div>
                        werkzaamheden June, Oegstgeest
                        <br />
                        <span>20 uur | uurtarief €35,00 </span>
                    </div>
                ),
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
                            <Invoice.ClientInfo {...clientInfo} />
                            <Invoice.InvoiceInfo {...invoiceInfo} />
                        </Element.Col>
                        <Element.Col>
                            <Invoice.CompanyInfo {...companyInfo} />
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={4}>
                        <Element.Col>
                            <Element.Heading1>
                                Factuur{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
                            </Element.Heading1>
                            <Element.Table>
                                <thead>
                                    <tr>
                                        <th className="amount">aantal</th>
                                        <th className="description">
                                            omschrijving
                                        </th>
                                        <th className="currency" />
                                        <th className="unit-price">
                                            stukprijs
                                        </th>
                                        <th className="currency" />
                                        <th className="price">prijs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceLines.map((line, index) => (
                                        <InvoiceLine key={index} {...line} />
                                    ))}
                                </tbody>
                            </Element.Table>
                            <Element.TableTotals>
                                <tr className="subtotal">
                                    <td>&nbsp;</td>
                                    <td className="label">subtotal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <SubTotal invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="tax">
                                    <td>&nbsp;</td>
                                    <td className="label">BTW (21%)</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Tax invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="total">
                                    <td>&nbsp;</td>
                                    <td className="label">totaal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Total invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                            </Element.TableTotals>
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={5}>
                        <Element.Col>
                            <p>
                                Gelieve uw (restant)betaling (€{' '}
                                {<Total invoiceLines={invoiceLines} />}) binnen
                                14 dagen te voldoen op bankrekeningnummer
                                <br /> {companyInfo.bank} t.n.v.{' '}
                                {companyInfo.name}
                                o.v.v. {invoiceInfo.invoiceNumber}.
                            </p>
                            <p>
                                Voor vragen over deze factuur kunt u contact
                                opnemen via
                                <br /> {companyInfo.administrationEmail} /{' '}
                                {companyInfo.phone}
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
                                Specificaties{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
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
    })
    .add('Invoice - Eric van Rijssen', () => {
        const clientInfo = {
            firstName: 'Eric',
            lastName: 'van Rijssen',
        };

        const invoiceInfo = {
            invoiceNumber: '202004002',
            date: '01/04/2020',
            expirationDate: '14/04/2020',
        };

        const companyInfo = {
            address: 'Toermalijnlaan 40',
            zipcode: '3523 BH',
            city: 'Utrecht',
            country: 'Nederland',
            CoC: '77 638 425',
            tax: '8610.74.956',
            bank: 'NL98 BUNQ 2042 5806 51',
            phone: '+31 (0)30 22 705 75',
            email: 'info@novaclima.nl',
            website: 'www.novaclima.nl',
            name: 'Nova Clima',
            administrationEmail: 'administratie@novaclima.nl',
        };

        const invoiceLines = [
            {
                amount: 2,
                price: 65000,
                description: <div>R32 vloermodel 2,0 kW binnenunit</div>,
            },
            {
                amount: 1,
                price: 100000,
                description: (
                    <div>
                        R32 Free Multi system Z 3,3 - 6,0 kW buitenunit
                        <br />
                        <span>type CU-2Z41TBE</span>
                    </div>
                ),
            },
            {
                amount: 1,
                price: 29690,
                description: <div>Montage materiaal</div>,
            },
            {
                amount: 1,
                price: 16245,
                description: <div>Elektra materiaal</div>,
            },
            {
                amount: 1,
                price: 46540,
                description: <div>Koeltechnisch materiaal</div>,
            },
            {
                amount: 1,
                price: 130000,
                description: <div>Installatie materiaal</div>,
            },
            {
                amount: 1,
                price: 10000,
                description: <div>Voorrijkosten binnen straal 20 KM</div>,
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
                            <Invoice.ClientInfo {...clientInfo} />
                            <Invoice.InvoiceInfo {...invoiceInfo} />
                        </Element.Col>
                        <Element.Col>
                            <Invoice.CompanyInfo {...companyInfo} />
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={4}>
                        <Element.Col>
                            <Element.Heading1>
                                Factuur{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
                            </Element.Heading1>
                            <Element.Table>
                                <thead>
                                    <tr>
                                        <th className="amount">aantal</th>
                                        <th className="description">
                                            omschrijving
                                        </th>
                                        <th className="currency" />
                                        <th className="unit-price">
                                            stukprijs
                                        </th>
                                        <th className="currency" />
                                        <th className="price">prijs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceLines.map((line, index) => (
                                        <InvoiceLine key={index} {...line} />
                                    ))}
                                </tbody>
                            </Element.Table>
                            <Element.TableTotals>
                                <tr className="subtotal">
                                    <td>&nbsp;</td>
                                    <td className="label">subtotal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <SubTotal invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="tax">
                                    <td>&nbsp;</td>
                                    <td className="label">BTW (21%)</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Tax invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="total">
                                    <td>&nbsp;</td>
                                    <td className="label">totaal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Total invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                            </Element.TableTotals>
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={5}>
                        <Element.Col>
                            <p>
                                Gelieve uw (restant)betaling (€{' '}
                                {<Total invoiceLines={invoiceLines} />}) binnen
                                14 dagen te voldoen op bankrekeningnummer
                                <br /> {companyInfo.bank} t.n.v.{' '}
                                {companyInfo.name}
                                o.v.v. {invoiceInfo.invoiceNumber}.
                            </p>
                            <p>
                                Voor vragen over deze factuur kunt u contact
                                opnemen via
                                <br /> {companyInfo.administrationEmail} /{' '}
                                {companyInfo.phone}
                            </p>
                        </Element.Col>
                    </Element.Row>
                </Element.Page>
            </Element.Document>
        );
    })
    .add('Invoice - H. Robben', () => {
        const clientInfo = {
            firstName: 'Henry',
            lastName: 'Robben',
        };

        const invoiceInfo = {
            invoiceNumber: '202004002',
            date: '01/04/2020',
            expirationDate: '14/04/2020',
        };

        const companyInfo = {
            address: 'Toermalijnlaan 40',
            zipcode: '3523 BH',
            city: 'Utrecht',
            country: 'Nederland',
            CoC: '77 638 425',
            tax: '8610.74.956',
            bank: 'NL98 BUNQ 2042 5806 51',
            phone: '+31 (0)30 22 705 75',
            email: 'info@novaclima.nl',
            website: 'www.novaclima.nl',
            name: 'Nova Clima',
            administrationEmail: 'administratie@novaclima.nl',
        };

        const invoiceLines = [
            {
                amount: 2,
                price: 61360,
                description: <div>KIT Airco unit R32 wandmodel 2,5 kW</div>,
            },
            {
                amount: 1,
                price: 9486,
                description: <div>Koeltechnisch materiaal</div>,
            },
            {
                amount: 1,
                price: 5305,
                description: <div>Elektra materiaal</div>,
            },

            {
                amount: 1,
                price: 29380,
                description: <div>Montage materiaal</div>,
            },
            {
                amount: 1,
                price: 45000,
                description: <div>Installatie</div>,
            },
            {
                amount: 1,
                price: 0,
                description: <div>Voorrijkosten binnen straal 20 KM</div>,
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
                            <Invoice.ClientInfo {...clientInfo} />
                            <Invoice.InvoiceInfo {...invoiceInfo} />
                        </Element.Col>
                        <Element.Col>
                            <Invoice.CompanyInfo {...companyInfo} />
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={4}>
                        <Element.Col>
                            <Element.Heading1>
                                Factuur{' '}
                                <span> | {invoiceInfo.invoiceNumber}</span>
                            </Element.Heading1>
                            <Element.Table>
                                <thead>
                                    <tr>
                                        <th className="amount">aantal</th>
                                        <th className="description">
                                            omschrijving
                                        </th>
                                        <th className="currency" />
                                        <th className="unit-price">
                                            stukprijs
                                        </th>
                                        <th className="currency" />
                                        <th className="price">prijs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceLines.map((line, index) => (
                                        <InvoiceLine key={index} {...line} />
                                    ))}
                                </tbody>
                            </Element.Table>
                            <Element.TableTotals>
                                <tr className="subtotal">
                                    <td>&nbsp;</td>
                                    <td className="label">subtotal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <SubTotal invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="tax">
                                    <td>&nbsp;</td>
                                    <td className="label">BTW (21%)</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Tax invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                                <tr className="total">
                                    <td>&nbsp;</td>
                                    <td className="label">totaal</td>
                                    <td className="currency">&euro;</td>
                                    <td className="amount">
                                        <Total invoiceLines={invoiceLines} />
                                    </td>
                                </tr>
                            </Element.TableTotals>
                        </Element.Col>
                    </Element.Row>
                    <Element.Row top={5}>
                        <Element.Col>
                            <p>
                                Gelieve uw (restant)betaling (€{' '}
                                {<Total invoiceLines={invoiceLines} />}) binnen
                                14 dagen te voldoen op bankrekeningnummer
                                <br /> {companyInfo.bank} t.n.v.{' '}
                                {companyInfo.name}
                                o.v.v. {invoiceInfo.invoiceNumber}.
                            </p>
                            <p>
                                Voor vragen over deze factuur kunt u contact
                                opnemen via
                                <br /> {companyInfo.administrationEmail} /{' '}
                                {companyInfo.phone}
                            </p>
                        </Element.Col>
                    </Element.Row>
                </Element.Page>
            </Element.Document>
        );
    });
