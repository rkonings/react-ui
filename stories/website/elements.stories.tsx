import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';

import { Card } from '../../src/Website/Elements/Card';
import { ContactForm } from '../../src/Website/Elements/ContactForm';
import { Expert } from '../../src/Website/Elements/Expert';
import { ContactInfo } from '../../src/Website/Elements/ContactInfo';

import {
    Speciality,
    SpecialityColumnLeft,
    SpecialityColumnRight,
    SpecialityTitle,
} from '../../src/Website/Elements/Speciality';

storiesOf('website/elements', module)
    .add('ContactInfo', () => {
        return (
            <ContactInfo
                address="toermalijnlaan 40"
                city="Utrecht"
                zipcode="3523 BH"
                email="info@novaclima.nl"
                phone="030 254 23 56"
            />
        );
    })
    .add('Contact Form', () => {
        return <ContactForm onSubmit={action('onSubmit')} />;
    })
    .add('Expert', () => {
        return (
            <Expert
                title="Heeft u advies nodig?"
                content="Bel met onze specialist of laat uw contactgegevens achter en u wordt terug gebeld."
                phone="030 60 234 23"
                image="https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
        );
    })
    .add('card', () => {
        const title = text('title', 'Woonkamer');
        const image = text(
            'image',
            'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        );

        return <Card title={title} image={image} />;
    })
    .add('Speciality', () => {
        const title = text('title', 'Woonkamer');
        const image = text(
            'image',
            'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        );
        return (
            <Speciality>
                <SpecialityColumnLeft>
                    <SpecialityTitle>voor uw woning</SpecialityTitle>
                    <Card title={title} image={image} />
                    <Card
                        title={'Slaapkamer'}
                        image={
                            'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                        }
                    />
                </SpecialityColumnLeft>
                <SpecialityColumnRight>
                    <SpecialityTitle>zakelijke oplossingen</SpecialityTitle>
                    <Card
                        title={'kantoor'}
                        image={
                            'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                        }
                    />
                    <Card
                        title={'food'}
                        image={
                            'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                        }
                    />
                    <Card
                        title={'winkel'}
                        image={
                            'https://images.pexels.com/photos/581344/pexels-photo-581344.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                        }
                    />
                    <Card
                        title={'restaurant & cafe'}
                        image={
                            'https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                        }
                    />
                    <Card
                        title={'Serverruimte & IT'}
                        image={
                            'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                        }
                    />
                    <Card
                        title={'Zorg'}
                        image={
                            'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                        }
                    />
                </SpecialityColumnRight>
            </Speciality>
        );
    });
