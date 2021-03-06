import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import moment from 'moment';
import React from 'react';

import CalendarDateRange from '../src/Calendar/CalendarDateRange';

storiesOf('Calendar', module)
.add('with daterange', () => {
    const options = {
        range: true,
        min: 2000,
        max: 2028,
        step: 1,
    };

    const range = {
        start: moment([2019, 0, 1]),
        end: moment([2019, 0, 14])
    };

    return (
        <CalendarDateRange
            width={280}
            onChange={action('Change')}
            startYear={number('Start year', 2018, options)}
            endYear={number('End year', 2028, options)}
            value={range}
        />
    );
});
