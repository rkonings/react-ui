import * as React from 'react';
import styled from 'styled-components';
import { Event } from './interfaces';
import Month from './Month';

interface Calendar {
    className?: string;
    events: Event[];
}

export const Calendar = ({className, events}: Calendar) => {
    return (
        <div className={className}>
            <Month year={2019} month={0} events={events} />
            <Month year={2019} month={1} events={events} />
        </div>
    );
};

export default styled(Calendar)``;
