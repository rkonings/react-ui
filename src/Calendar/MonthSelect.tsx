import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

interface Month {
    selected: boolean;
    selectedDateInMonth: boolean;
}

const Month = styled.div<Month>`
    display:flex;
    width: 15%;
    height: 30px;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;

    ${({selected, selectedDateInMonth, theme: { color}}) => {
        let backgroundColor = 'none';
        let textColor = color.black;
        let borderColor = 'rgba(0,0,0,0)';
        if (selected) {
            backgroundColor = color.primary;
            textColor = color.white;
        } else if (selectedDateInMonth) {
            borderColor = color.primary;
        }

        return `
            background: ${backgroundColor};
            color: ${textColor};
            border-bottom: 2px solid ${borderColor};
        `;
    }};

    &:hover {
        background: ${({theme: { color }}) => color.blue90};
        color: ${({theme: { color }}) => color.white};
    }
`;

const Title = styled.div`
    width: 100%;
    font-weight: 500;
    font-size: 14px;
`;

interface Calendar {
    className?: string;
    year: number;
    selectedMonth: number;
    selectedYear: number;
    selectedDate: moment.Moment;
    onChange(year: number, month: number): void;
}

const Calendar = styled(({className, onChange, year, selectedMonth, selectedYear, selectedDate}: Calendar) => {
    const months = moment.monthsShort('-MMM-');
    return (
        <div className={className}>
            <Title>{year}</Title>
            {months.map((m, index) => (
                <Month
                    onClick={() => onChange(year, index)}
                    key={m}
                    selected={selectedMonth === index && selectedYear === year}
                    selectedDateInMonth={selectedDate.isSame(moment([year, index]), 'month')}
                >
                    {m}
                </Month>
            ))}
        </div>
    );
})`
    display:flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 25px;
`;

interface MonthSelect {
    className?: string;
    startYear: number;
    endYear: number;
    selectedMonth: number;
    selectedYear: number;
    selectedDate: moment.Moment;
    onChange(year: number, month: number): void;
}

export const MonthSelect = styled(({className, onChange, selectedMonth,
    selectedYear, selectedDate, startYear, endYear}: MonthSelect) => {

    const onChangeHandler = (year: number, month: number) => {
        onChange(year, month);
    };

    const calendar = [];
    for (let i = 0; i <= (endYear - startYear); i++) {
        calendar.push(
            <Calendar
                selectedDate={selectedDate}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                year={startYear + i}
                onChange={onChangeHandler}
            />
        );
    }

    return (
        <div className={className}>
            {calendar}
        </div>
    );
})`
    margin-bottom: 25px;
`;
