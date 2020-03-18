import { storiesOf } from '@storybook/react';
import React from 'react';

import * as Element from '../../src/Document/Elements';

storiesOf('documents', module).add('Offer', () => {
    return (
        <Element.Document>
            <Element.FrontPage
                title="Offerte"
                company="Nova Clima"
                client="F. Baz"
                date="27/2/2020"
                reference="2020 AIR 0302020"
                expirationDate="30/3/2020"
            />
            <Element.ContactInfoPage
                companyName="Nova Clima"
                CoC="12 23 23 23"
                address="Toermalijnlaan 40"
                zipcode="3523 BH"
                city="Utrecht"
                country="Nederland"
                contactName="Loek Robben"
                email="l.robben@novaclima.nl"
                phone="0623 23 23 23 "
                RSIN="123 12 312"
                IBAN="NL37 INGB0 000 3434 2323"
                BIC="ACF12 23 FD 43"
            />
            <Element.Page>
                <p>Beste J. Janssen</p>
                <p>
                    ons team bedankt u alvast voor het vertrouwen en wij streven
                    om dit project voor beide partijen tot een succes te
                    brengen. Als u vragen heeft, kunt u ons telefonisch bereiken
                    en uiteraard via e-mail of whatsapp.
                </p>
                <Element.Row>
                    <Element.Col>
                        <Element.Heading1>Over Nova Clima</Element.Heading1>
                        <p>
                            Nova Clima is een klimaatbeheersing
                            installatiebedrijf voor koeling en/of verwarming van
                            ruimtes, waarbij een constante comfortabele
                            temperatuur is gewenst. Wij bieden
                            maatwerkoplossingen aan die passen bij uw situatie
                            en wensen.
                        </p>
                        <p>
                            Wij zien ons als partner voor klimaatbeheersing voor
                            lokale bedrijven, met als uitgangspunt een gezond
                            klimaat en de efficiëntste oplossingen.
                        </p>
                        <Element.Heading1>Onze missie</Element.Heading1>
                        <p>
                            Wij streven naar betrouwbare, kwalitatief goede en
                            pragmatische oplossingen en kiezen voor transparante
                            communicatie door middel van korte lijnen tussen ons
                            en u. Het opbouwen van een klantrelatie is een
                            belangrijk kernpunt van het bedrijf. Wij meten ons
                            succes af aan de tevredenheid van onze klanten.
                        </p>
                        <Element.Heading1>Certificering</Element.Heading1>
                        <p>
                            Alle installaties worden door Stek gecertificeerde
                            monteurs in werking gesteld.
                        </p>
                    </Element.Col>
                </Element.Row>
            </Element.Page>
            <Element.Page>
                <Element.Row>
                    <Element.Col>
                        <Element.Heading1>Advies</Element.Heading1>
                        <p>
                            Op basis van de technische opname (3/3/2020) zijn de
                            volgende oplossingen samengesteld.
                        </p>
                    </Element.Col>
                </Element.Row>
                <Element.Row top={4}>
                    <Element.Col>
                        <Element.Heading1>
                            Oplossing&nbsp;
                            <span>
                                | Winkelruimte de Kempenaerstraat, Oegstgeest
                            </span>
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
                                    <td className="amount">1</td>
                                    <td className="description">
                                        KIT R32 14kW PACi Cassette 90x90
                                        <br />
                                        <span>type KIT-140PU2Z8</span>
                                    </td>
                                    <td className="currency">&euro;</td>
                                    <td className="unit-price">4.200,00</td>
                                    <td className="currency">&euro;</td>
                                    <td className="price">4.200,00</td>
                                </tr>
                                <tr>
                                    <td className="amount">1</td>
                                    <td className="description">
                                        KIT R32 14kW PACi Cassette 90x90
                                        <br />
                                        <span>type KIT-140PU2Z8</span>
                                    </td>
                                    <td className="currency">&euro;</td>
                                    <td className="unit-price">4.200,00</td>
                                    <td className="currency">&euro;</td>
                                    <td className="price">4.200,00</td>
                                </tr>
                            </tbody>
                        </Element.Table>
                        <Element.TableTotals>
                            <tr className="subtotal">
                                <td>&nbsp;</td>
                                <td className="label">subtotal</td>
                                <td className="currency">&euro;</td>
                                <td className="amount">645,00</td>
                            </tr>
                            <tr className="tax">
                                <td>&nbsp;</td>
                                <td className="label">BTW (21%)</td>
                                <td className="currency">&euro;</td>
                                <td className="amount">123,00</td>
                            </tr>
                            <tr className="total">
                                <td>&nbsp;</td>
                                <td className="label">totaal</td>
                                <td className="currency">&euro;</td>
                                <td className="amount">645,00</td>
                            </tr>
                        </Element.TableTotals>
                    </Element.Col>
                </Element.Row>
            </Element.Page>
            <Element.Page>
                <Element.Row>
                    <Element.Col>
                        <Element.Heading1>
                            Leveringsvoorwaarden
                        </Element.Heading1>
                        <p>Tot onze levering behoren:</p>
                        <ul>
                            <li>Franco levering van alle materialen</li>
                            <li>Demontage oude installatie</li>
                            <li>Montage en inbedrijfstelling installatie</li>
                            <li>Inzet steigerwerk tot 2,5 meter werkhoogte</li>
                            <li>
                                Verticaal transport tot 3 meter boven maaiveld
                            </li>
                            <li>Reis- en verblijfskosten</li>
                            <li>Logboek en gebruikshandleiding</li>
                            <li>Instructie gebruiker</li>
                        </ul>

                        <p>Niet tot onze levering behoren:</p>
                        <ul>
                            <li>Hak- en breekwerk</li>
                            <li>Betonboorwerk groter dan 25 mm</li>
                            <li>Schilderwerk</li>
                            <li>Bouwkundige voorzieningen</li>
                            <li>Loodgieterswerk</li>
                            <li>
                                Elektrische voeding tot aan de schakelkast van
                                de buitenunit
                            </li>
                            <li>Geluidwerende voorzieningen</li>
                            <li>Transport anders dan over de verharde weg</li>
                        </ul>
                    </Element.Col>
                </Element.Row>
            </Element.Page>

            <Element.Page>
                <Element.Row>
                    <Element.Col>
                        <Element.OfferConformation />
                    </Element.Col>
                </Element.Row>

                <Element.Row>
                    <Element.Col>
                        <p>
                            Opgemaakt te Breukelen, op 4/3/2020, in twee
                            originelen, waarvan elke partij verklaart haar
                            exemplaar ontvangen te hebben.
                        </p>
                    </Element.Col>
                </Element.Row>
                <Element.Row top={2}>
                    <Element.Col>
                        <Element.Heading3>Offerte vervaldatum</Element.Heading3>
                        <div>12/3/2020</div>
                    </Element.Col>
                    <Element.Col>
                        <Element.Heading3>Betalingstermijn</Element.Heading3>
                        <div>14 dagen na factuurdatum</div>
                    </Element.Col>
                </Element.Row>

                <Element.Row top={5}>
                    <Element.Col>
                        <Element.Signature label="de KLANT" />
                    </Element.Col>
                    <Element.Col>
                        <Element.Signature label="Nova Clima" />
                    </Element.Col>
                </Element.Row>
            </Element.Page>
        </Element.Document>
    );
});
