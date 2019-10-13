import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import { Event } from './interfaces';
import Week from './Week';

const MonthTitle = styled.div`
    width: 100%;
    text-transform: uppercase;
    font-size: 14px;
`;

interface Month {
    className?: string;
    month: number;
    year: number;
    events: Event[];
}

export default styled(({className, month, year, events}: Month) => {
    const firstDayOfMonth = moment([year, month]).startOf('month');
    const weeksInMonth = Math.ceil((firstDayOfMonth.isoWeekday() + firstDayOfMonth.daysInMonth()) / 7);
    const weeks = [];

    for (let i = 0; i < weeksInMonth; i++ ) {
        weeks.push(
            <Week
                key={i}
                events={events}
                isoWeek={firstDayOfMonth.clone().startOf('isoWeek')}
            />
        );

        firstDayOfMonth.add(7, 'days');
    }

    return (
        <div className={className}>
            <MonthTitle>{moment([year, month]).format('MMM YYYY')}</MonthTitle>
            {weeks}
        </div>
    );
})`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 25px;
`;
