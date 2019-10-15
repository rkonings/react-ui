import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { EventCalendar } from '../src/EventCalendar/';
import { Event } from '../src/EventCalendar/interfaces';

storiesOf('Event calendar', module)
    .add('default', () => {
        const events: Event[] = [
            {
                start: '2019-01-15',
                end: '2019-02-16',
                title: 'Event 0',
                id: '0'
            },
            {
                start: '2019-01-15',
                end: '2019-01-16',
                title: 'Event 1',
                id: '1'
            },
            {
                start: '2019-01-01',
                end: '2019-01-10',
                title: 'Event 2',
                id: '2'
            },
            {
                start: '2019-01-02',
                end: '2019-01-05',
                title: 'Event 3',
                id: '3'
            },
            {
                start: '2019-01-12',
                end: '2019-01-15',
                title: 'Event 4',
                id: '4'
            },
            {
                start: '2019-01-01',
                end: '2019-01-02',
                title: 'Event 5',
                id: '5'
            },
        ];

        const month = select('Month', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 0);
        const year = number('Year', 2019);
        return <EventCalendar year={year} month={month} events={events} />;
    });
