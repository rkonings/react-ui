import { action } from '@storybook/addon-actions';
import { boolean, date, number, select, text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import moment from 'moment';
import React from 'react';

import Calendar from '../src/Calendar/Calendar';

storiesOf('Calendar', module)
.add('default', () => {
    const options = {
        range: true,
        min: 2000,
        max: 2022,
        step: 1,
    };

    return (
        <Calendar
            onChange={action('Change')}
            startYear={number('Start year', 2018, options)}
            endYear={number('End year', 2020, options)}
            value={moment(date('Date', new Date()))}
        />
    );
});
