import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Card } from '../../src/Website/Elements/Card';
import {
    Speciality,
    SpecialityTitle,
    SpecialityColumnLeft,
    SpecialityColumnRight,
} from '../../src/Website/Elements/Speciality';

storiesOf('website/elements', module)
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
