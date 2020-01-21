import { storiesOf } from '@storybook/react';
import moment from 'moment';
import React from 'react';
import TimePicker from '../../src/Input/TimePicker';

import { action } from '@storybook/addon-actions';

storiesOf('Input/TimePicker', module)
    .add('default', () => {
        return <TimePicker onChange={action('onChange')} />;
    })
    .add('with value', () => {
        return (
            <TimePicker
                value={{
                    start: moment([2020, 1, 2])
                        .set('hours', 10)
                        .toDate(),
                    end: moment([2020, 1, 2])
                        .set('hours', 13)
                        .toDate(),
                }}
                onChange={action('onChange')}
            />
        );
    });
