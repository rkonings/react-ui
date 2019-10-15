import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import Day from './Day';

const WeekNumber = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 30px;
    font-weight: bold;
    height: 40px;
    font-size: 12px;
    color: ${({theme: { color }}) => color.gray60 };
`;

interface Week {
    className?: string;
    isoWeek: moment.Moment;
    month: number;
    year: number;
}

export default styled(({className, isoWeek, year, month}: Week) => {
    const days = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className={className}>
            <WeekNumber>{isoWeek.isoWeek()}</WeekNumber>
            {days.map((weekDay) => {
                isoWeek.isoWeekday(weekDay);
                const day = isoWeek.date();
                return (
                    <Day
                        isInMonth={isoWeek.isSame(moment([year, month, 1]), 'month')}
                        date={isoWeek.format('YYYY-MM-DD')}
                        key={weekDay}
                        day={day}
                    />
                );
            })}
        </div>
    );
})`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;

    ${Day}:nth-child(2) {
        border-left: 1px solid ${({theme: { color }}) => color.gray20};
    }
`;
