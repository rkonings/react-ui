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
        'https://www.lg.com/uk/business/images/AC/features/uk_standard-plus_Feature_Simple-and-Slim-Design_D_1484045214178.jpg'
    );

    const title = text(
        'title',
        'Specialist in airconditioning installatie en onderhoud'
    );
    const subTitle = text('sub title', faker.lorem.words(8));

    const sectionImage1 = text(
        'section 1 image',
        'https://images.samsung.com/is/image/samsung/p5/latin/244041/html/latin-feature-wind-free-9-185843332?$ORIGIN_JPG$'
    );

    const sectionImage2 = text(
        'section 2 image',
        'https://www.dekatec.nl/wp-content/uploads/2014/08/20140428_1337141-1024x576.jpg'
        // 'https://gavinlowe.co.nz/wp-content/uploads/2019/05/GavinLowe-Panasonic-ceiling-cassette.jpg'
    );

    const caseImage = [
        'https://i.ytimg.com/vi/PLTXt-YOOpM/maxresdefault.jpg',
        'https://www.lg.com/lk/images/AC/features/1-JSQ126EAP7_-Desktop_1600-x-800_v3.jpg',
        'https://us.123rf.com/450wm/archidea/archidea1604/archidea160400040/55875137-minimalistische-zwart-wit-woonkamer-met-een-bank-en-air-conditioner-3d-rendering.jpg?ver=6',
    ];

    return (
        <Homepage>
            <Header logo={'KLIMA'}>
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
                title={'Slimme airconditioning oplossingen voor woningen'}
                subTitle={'Energie zuinig met een hoog rendement'}
                image={sectionImage1}
            >
                {faker.lorem.words(50)}
            </ServiceSection>
            <ServiceSection
                title={'Inspectie, service & onderhoud'}
                subTitle={'Levensduur van een airconditioning verlengen'}
                image={sectionImage2}
            >
                {faker.lorem.words(50)}
            </ServiceSection>
            <ClientSection
                reverse={true}
                title={'Onze klanten'}
                subTitle={'Wat zeggen onze klanten over ons'}
                image={sectionImage2}
            >
                {faker.lorem.words(50)}
            </ClientSection>
            <CasesSection title={'Onze projecten'}>
                <Case image={caseImage[2]} title={'M. van Eck uit Utrecht'} />
                <Case image={caseImage[1]} title={'R. Dijkema uit Maarssen'} />
                <Case
                    image={caseImage[0]}
                    title={'Administratie kantoor KS uit Breukelen'}
                />
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
