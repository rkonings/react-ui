import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { EventCalendar } from '../src/EventCalendar/';

storiesOf('Event calendar', module)
    .add('default', () => {
        return <EventCalendar />;
    });
