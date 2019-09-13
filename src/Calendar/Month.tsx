import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import { DateRange } from '../interfaces/Date';
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
    value: moment.Moment | DateRange;
    potentialRange?: DateRange | null;
    onChangePotentialRange?(date: moment.Moment): void;
    onChange(year: number, month: number, day: number): void;
}

export default styled(({className, month, year, value,
    potentialRange, onChangePotentialRange, onChange}: Month) => {
    const firstDayOfMonth = moment([year, month]).startOf('month');
    const weeksInMonth = Math.ceil((firstDayOfMonth.isoWeekday() + firstDayOfMonth.daysInMonth()) / 7);
    const weeks = [];

    for (let i = 0; i < weeksInMonth; i++ ) {
        weeks.push(
            <Week
                key={i}
                isoWeek={firstDayOfMonth.clone().startOf('isoWeek')}
                value={value}
                month={month}
                year={year}
                onChange={onChange}
                potentialRange={potentialRange}
                onChangePotentialRange={onChangePotentialRange}
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
