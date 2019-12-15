import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { FilterBar } from '../src/Filters';
import FilterPopup from '../src/Filters/FilterPopup';
import Countries from './Data/countries.json';

const WrapperAlignTop = styled.div`
    align-self: flex-start;
`;

storiesOf('Filters', module)
    .add('default', () => {
        const data = [
            {
                id: 'League',
                label: 'League',
                options: [
                    { value: 'Eredivisie', label: 'Eredivisie' },
                    { value: 'La Liga', label: 'La Liga' },
                    { value: 'Ligue 1', label: 'Ligue 1' },
                ],
                value: [],
            },
            {
                id: 'Country',
                label: 'Country',
                options: Countries.map(item => {
                    return { value: item.name, label: item.name };
                }),
                value: [],
                search: true,
            },
            {
                id: 'Clubs',
                label: 'Clubs',
                options: [
                    { value: 'Ajax', label: 'Ajax' },
                    { value: 'Heerenveen', label: 'Heerenveen' },
                    { value: 'FC Utrecht', label: 'FC Utrecht' },
                ],
                value: [],
            },
        ];

        return (
            <WrapperAlignTop>
                <FilterBar data={data} onChange={action('changed')} />
            </WrapperAlignTop>
        );
    })
    .add('popup', () => {
        const data = [
            {
                id: 'League',
                label: 'League',
                options: [
                    { value: 'Eredivisie', label: 'Eredivisie' },
                    { value: 'La Liga', label: 'La Liga' },
                    { value: 'Ligue 1', label: 'Ligue 1' },
                ],
                value: [],
            },
            {
                id: 'Country',
                label: 'Country',
                options: Countries.map(item => {
                    return { value: item.name, label: item.name };
                }),
                value: [],
                search: true,
            },
            {
                id: 'Clubs',
                label: 'Clubs',
                options: [
                    { value: 'Ajax', label: 'Ajax' },
                    { value: 'Heerenveen', label: 'Heerenveen' },
                    { value: 'FC Utrecht', label: 'FC Utrecht' },
                ],
                value: [],
            },
        ];

        return (
            <WrapperAlignTop>
                <FilterPopup data={data} onChange={action('changed')} />
            </WrapperAlignTop>
        );
    });
