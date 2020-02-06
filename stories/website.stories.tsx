import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import React from 'react';
import {
    Case,
    CasesSection,
    ClientSection,
    Footer,
    FooterCol1,
    FooterCol2,
    FooterCol3,
    FooterNav,
    FooterNavItem,
    Homepage,
    HomepageBanner,
    ServiceSection,
    Title,
    Header,
    MainNavigation,
    MainNavItem,
} from '../src/Website';

storiesOf('Website', module).add('Homepage', () => {
    const background = text(
        'background',
        'https://images.unsplash.com/photo-1573240612702-cbe5d249b7ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80'
    );

    const title = text('title', faker.lorem.words(4));
    const subTitle = text('sub title', faker.lorem.words(8));

    const sectionImage = text(
        'image',
        'https://images.unsplash.com/photo-1541753231552-fa0b6f0c4d7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
    );

    const image =
        'https://images.unsplash.com/photo-1545866622-dc4b678afea7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1936&q=80';

    return (
        <Homepage>
            <Header logo={faker.lorem.words(2)}>
                <MainNavigation>
                    <MainNavItem url="#" title="#">
                        home
                    </MainNavItem>
                    <MainNavItem url="#" title="#">
                        diensten
                    </MainNavItem>
                    <MainNavItem url="#" title="#">
                        over ons
                    </MainNavItem>
                    <MainNavItem url="#" title="#">
                        contact
                    </MainNavItem>
                </MainNavigation>
            </Header>
            <HomepageBanner
                background={background}
                title={title}
                subTitle={subTitle}
            />
            <ServiceSection
                reverse={true}
                title={faker.lorem.words(3)}
                subTitle={faker.lorem.words(4)}
                image={sectionImage}
            >
                {faker.lorem.words(50)}
            </ServiceSection>
            <ServiceSection
                title={faker.lorem.words(3)}
                subTitle={faker.lorem.words(4)}
                image={sectionImage}
            >
                {faker.lorem.words(50)}
            </ServiceSection>
            <ClientSection
                reverse={true}
                title={faker.lorem.words(3)}
                subTitle={faker.lorem.words(4)}
                image={sectionImage}
            >
                {faker.lorem.words(50)}
            </ClientSection>
            <CasesSection title={faker.lorem.words(7)}>
                <Case image={image} title={faker.lorem.words(7)}>
                    {faker.lorem.words(10)}
                </Case>
                <Case image={image} title={faker.lorem.words(7)}>
                    {faker.lorem.words(10)}
                </Case>
                <Case image={image} title={faker.lorem.words(7)}>
                    {faker.lorem.words(10)}
                </Case>
                <Case image={image} title={faker.lorem.words(7)}>
                    {faker.lorem.words(10)}
                </Case>
                <Case image={image} title={faker.lorem.words(7)}>
                    {faker.lorem.words(10)}
                </Case>
                <Case image={image} title={faker.lorem.words(7)}>
                    {faker.lorem.words(10)}
                </Case>
            </CasesSection>
            <Footer>
                <FooterCol1>
                    <Title>Wij staan voor u klaar</Title>
                    <p>Ma - Zo, 9.00 - 18.00</p>
                    <p>
                        +31 (020) - 4023777
                        <br />
                        info@airco.nl
                        <br />
                        +31 6 33665533
                    </p>
                </FooterCol1>
                <FooterCol2>
                    <Title>Voor bedrijven</Title>
                    <FooterNav>
                        <FooterNavItem url="#" title="zorg">
                            Zorg
                        </FooterNavItem>
                        <FooterNavItem url="#" title="kantoor">
                            Kantoor
                        </FooterNavItem>
                        <FooterNavItem url="#" title="retail">
                            Retail
                        </FooterNavItem>
                        <FooterNavItem url="#" title="educatie">
                            Educatie
                        </FooterNavItem>
                        <FooterNavItem url="#" title="restaurant &amp; Hotel">
                            Restaurant &amp; Hotel
                        </FooterNavItem>
                    </FooterNav>
                </FooterCol2>
                <FooterCol3>
                    <Title>Voor Particulieren</Title>
                    <FooterNav>
                        <FooterNavItem url="#" title="woonkamer">
                            Woonkamer
                        </FooterNavItem>
                        <FooterNavItem url="#" title="slaapkamer">
                            Slaapkamer
                        </FooterNavItem>
                        <FooterNavItem url="#" title="hobbiekamer">
                            Hobbiekamer
                        </FooterNavItem>
                        <FooterNavItem url="#" title="voordelen">
                            Voordelen
                        </FooterNavItem>
                    </FooterNav>
                </FooterCol3>
            </Footer>
        </Homepage>
    );
});
