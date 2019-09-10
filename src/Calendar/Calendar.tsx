import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import { MonthSelect } from './MonthSelect';

interface Day {
    className?: string;
    day: number;
    month: number;
    year: number;
    inCurrentMonth: boolean;
    isSelected: boolean;
    onClick(year: number, month: number, day: number): void;
}

const Day = styled(({className, day, month, year, inCurrentMonth, onClick}: Day) => {
    return (
        <div
            onClick={() => {
                if (inCurrentMonth) {
                    onClick(year, month, day);
                }
            }}
            className={className}
        >
            {day}
        </div>
    );
})`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${100 / 7}%;
    height: 40px;
    font-size: 12px;

    ${({isSelected, theme: { color }}) => {
        if (!isSelected) { return null; }
        return `
                background: ${color.primary};
                color: ${color.white};
            }
        `;
    }}

    ${({inCurrentMonth, isSelected, theme: { color }}) => {
        if (!inCurrentMonth) {
            return `
                color: ${color.gray40};
            `;
        }
        return `
            cursor: pointer;
            color: ${isSelected ? color.white : color.black};
            &:hover {
                background: ${color.primary};
                color: ${color.white};
            }
        `;
    }}
`;

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

const MonthTitle = styled.div`
    width: 100%;
    text-transform: uppercase;
    font-size: 14px;
`;

interface Week {
    className?: string;
    week: number;
    month: number;
    year: number;
    value: moment.Moment;
    onChange(year: number, month: number, day: number): void;
}
const Week = styled(({className, week, month, year, onChange, value}: Week) => {
    const date = moment().set({year, isoWeek: week}).startOf('isoWeek');
    const days = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className={className}>
            <WeekNumber>{date.isoWeek()}</WeekNumber>
            {days.map((day) => (
                <Day
                    onClick={onChange}
                    key={day}
                    inCurrentMonth={date.isoWeekday(day).isSame(moment([year, month, 1]), 'month')}
                    day={date.isoWeekday(day).get('D')}
                    month={month}
                    year={year}
                    isSelected={value.isSame(date.isoWeekday(day), 'day')}
                />
            ))}
        </div>
    );
})`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
`;

interface Month {
    className?: string;
    month: number;
    year: number;
    value: moment.Moment;
    onChange(year: number, month: number, day: number): void;
}

const Month = styled(({className, month, year, value, onChange}: Month) => {
    const firstDayOfMonth = moment([year, month]);
    const weeksInMonth = Math.ceil((firstDayOfMonth.isoWeekday() + firstDayOfMonth.daysInMonth()) / 7);
    const weeks = [];

    for (let i = 0; i < weeksInMonth; i++ ) {
        weeks.push(
            <Week
                week={firstDayOfMonth.isoWeek() + i}
                value={value}
                month={month}
                year={year}
                onChange={onChange}
            />
        );
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

interface Calendar {
    className?: string;
    value: moment.Moment;
    startYear: number;
    endYear: number;
    onChange(year: number, month: number, day: number): void;
}

const Calendar = ({className, value: _value, onChange, startYear, endYear}: Calendar) => {
    const [value, setValue] = React.useState<moment.Moment>(_value || moment());
    const [month, setMonth] = React.useState<number>(value.month());
    const [year, setYear] = React.useState<number>(value.year());

    React.useEffect(() => {
        setValue(_value);
        setMonth(_value.month());
        setYear(_value.year());
    }, [_value]);

    const onChangeHandler = (year: number, month: number, day: number) => {
        setValue(moment([year, month, day]));
        onChange(year, month, day);
    };

    const onChangeMonthHandler = (year: number, month: number) => {
        setMonth(month);
        setYear(year);
    };

    return (
        <div className={className}>
            <MonthSelect
                startYear={startYear}
                endYear={endYear}
                selectedDate={value}
                selectedYear={year}
                selectedMonth={month}
                onChange={onChangeMonthHandler}
            />
            <Month
                value={value}
                onChange={onChangeHandler}
                month={month}
                year={year}
            />
        </div>
    );
};

const StyledCalendar = styled(Calendar)`
    width: 280px;
`;

export default StyledCalendar;
