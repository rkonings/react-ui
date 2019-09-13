import moment, { isMoment } from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import isDateRange from '../Helpers/isDateRange';
import { DateRange } from '../interfaces/Date';
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
    month: number;
    year: number;
    isoWeek: moment.Moment;
    value: moment.Moment | DateRange;
    potentialRange?: DateRange | null;
    onChangePotentialRange?(date: moment.Moment): void;
    onChange(selectedDate: moment.Moment | null): void;
}

const isDaySelected = (selectedDate: moment.Moment | DateRange, startOfIsoWeek: moment.Moment, weekDay: number) => {
    let isSelected = false;
    if (isMoment(selectedDate)) {
        isSelected = selectedDate.isSame(startOfIsoWeek.isoWeekday(weekDay), 'day');

    } else {
        if ('start' in selectedDate && isMoment(selectedDate.start) &&
        'end' in selectedDate && isMoment(selectedDate.end)) {

            isSelected = selectedDate.start.isSame(startOfIsoWeek.isoWeekday(weekDay), 'day') ||
            selectedDate.end.isSame(startOfIsoWeek.isoWeekday(weekDay), 'day');

        } else if ('start' in selectedDate && isMoment(selectedDate.start)) {
            isSelected = selectedDate.start.isSame(startOfIsoWeek.isoWeekday(weekDay), 'day');

        }
    }

    return isSelected;
};

const isDayInRange = (selectedDate: moment.Moment | DateRange, startOfIsoWeek: moment.Moment, weekDay: number) => {
    if (isDateRange(selectedDate) && selectedDate.start && selectedDate.end) {
        return startOfIsoWeek.isoWeekday(weekDay).isBetween(selectedDate.start, selectedDate.end, 'day');
    }
    return false;
};

// const isDisabled = (selected: moment.Moment | DateRange, day: number, month: number, year: number) => {
//     if (isDateRange(selected) && selected.start && selected.end === null) {
//         return moment([year, month, day]).isBefore(selected.start, 'day');
//     }

//     return false;
// };

const IsInPotentialRange = (potentialRange: DateRange, startOfIsoWeek: moment.Moment, weekDay: number) => {
    if (potentialRange.start && potentialRange.end &&
        startOfIsoWeek.isoWeekday(weekDay).isBetween(potentialRange.start, potentialRange.end, 'day')) {

            return true;
        }

    return false;
};

export default styled(({className, isoWeek, month, year, onChange, value,
    potentialRange, onChangePotentialRange, }: Week) => {
    const days = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className={className}>
            <WeekNumber>{isoWeek.isoWeek()}</WeekNumber>
            {days.map((weekDay) => {
                isoWeek.isoWeekday(weekDay);
                const day = isoWeek.date();
                // const disabled = isDisabled(value, day, month, year);
                const inPotentialRange = potentialRange ?
                    IsInPotentialRange(potentialRange, isoWeek, weekDay) : false;

                return (
                    <Day
                        onClick={onChange}
                        key={weekDay}
                        inCurrentMonth={isoWeek.isSame(moment([year, month, 1]), 'month')}
                        day={day}
                        month={month}
                        year={year}
                        inPotentialRange={inPotentialRange}
                        // isDisabled={disabled}
                        isDisabled={false}
                        isSelected={isDaySelected(value, isoWeek, weekDay )}
                        isDayInRange={isDayInRange(value, isoWeek, weekDay)}
                        potentialRange={potentialRange}
                        onChangePotentialRange={onChangePotentialRange}
                    />);
                })}
        </div>
    );
})`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
`;
