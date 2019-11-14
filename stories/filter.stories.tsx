import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { FilterBar } from '../src/Filters';
import Countries from './Data/countries.json';

storiesOf('Filters', module)
.add('default', () => {

    const data = [
        {
            id: 'League',
            label: 'League',
            options: [
                'Eredivisie',
                'La Liga',
                'Ligue 1'
            ],
            value: []
        },
        {
            id: 'Country',
            label: 'Country',
            options: Countries.map((item) => item.name),
            value: []
        },
        {
            id: 'Clubs',
            label: 'Clubs',
            options: [
                'AJAX',
                'Feyenoord',
                'PSV'
            ],
            value: []
        }
    ];

    return (
        <FilterBar data={data} onChange={action('changed')} />
    );

});
