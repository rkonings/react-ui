import moment, { isMoment } from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import TextButton from '../Button/TextButton';
import StyledButtonGroup from '../ButtonGroup/ButtonGroup';
import { Grid, Item } from '../Grid';
import isDateRange from '../Helpers/isDateRange';
import { ArrowLeft, ArrowRight, CaretDown } from '../Icon/index';
import { DateRange } from '../interfaces/Date';
import { MonthSelect } from './MonthSelect';

interface Day {
    className?: string;
    day: number;
    month: number;
    year: number;
    inCurrentMonth: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isDayInRange: boolean;
    onClick(year: number, month: number, day: number): void;
}

const Day = styled(({className, day, month, year, inCurrentMonth, isDisabled, onClick}: Day) => {
    return (
        <div
            onClick={() => {
                if (inCurrentMonth && !isDisabled) {
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

    ${({isSelected, isDisabled, inCurrentMonth, isDayInRange, theme: { color }}) => {

        if (isSelected && inCurrentMonth) {
            return `
                background: ${color.primary};
                color: ${color.white};
            `;

        } else if (isDisabled && inCurrentMonth) {
            return `
                background: ${color.gray20};
                color: ${color.gray70};
                cursor: default;
            `;
        } else if (isDayInRange && inCurrentMonth) {
            return `
                background: ${color.blue10};
            }
        `;
        } else if (!inCurrentMonth) {
            return `
                color: ${color.gray40};
            `;
        }

        return;
    }}

    ${({isDisabled, inCurrentMonth, theme: { color }}) => {
        if (!isDisabled && inCurrentMonth) {
            return `
                cursor: pointer;
                &:hover {
                    background: ${color.primary};
                    color: ${color.white};
                }
            `;
        }
        return;
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
    value: moment.Moment | DateRange;
    onChange(year: number, month: number, day: number): void;
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

const isDisabled = (selected: moment.Moment | DateRange, day: number, month: number, year: number) => {
    if (isDateRange(selected) && selected.start && selected.end === null) {
        return moment([year, month, day]).isBefore(selected.start, 'day');
    }

    return false;
};

const Week = styled(({className, week, month, year, onChange, value}: Week) => {
    const date = moment().set({year, isoWeek: week}).startOf('isoWeek');
    const days = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className={className}>
            <WeekNumber>{date.isoWeek()}</WeekNumber>
            {days.map((weekDay) => {
                const day = date.isoWeekday(weekDay).get('D');
                const disabled = isDisabled(value, day, month, year);

                return (
                    <Day
                        onClick={onChange}
                        key={weekDay}
                        inCurrentMonth={date.isoWeekday(weekDay).isSame(moment([year, month, 1]), 'month')}
                        day={day}
                        month={month}
                        year={year}
                        isDisabled={disabled}
                        isSelected={isDaySelected(value, date, weekDay )}
                        isDayInRange={isDayInRange(value, date, weekDay)}
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

interface Month {
    className?: string;
    month: number;
    year: number;
    value: moment.Moment | DateRange;
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
    value: DateRange | moment.Moment;
    startYear: number;
    endYear: number;
    onChange(value: moment.Moment | DateRange): void;
}
interface DaySelect {
    className?: string;
    month: number;
    year: number;
    value: moment.Moment | DateRange;
    amountMonths: number;
    onChange(year: number, month: number, day: number): void;
}
const DaySelect = styled(({className, value, onChange, month, year, amountMonths = 3}: DaySelect) => {

    const months = [];
    const monthYear = moment([year, month]);

    for (let i = 0; i < amountMonths; i++) {
        months.push(
            <Month
                value={value}
                onChange={onChange}
                month={monthYear.month()}
                year={monthYear.year()}
            />
        );
        monthYear.add(1, 'month');
    }

    return (
        <div className={className}>
            {months}
        </div>
    );
})`

`;

const Calendar = ({className, value: _value, onChange, startYear, endYear}: Calendar) => {
    const [value, setValue] = React.useState<DateRange | moment.Moment>(_value);
    const [month, setMonth] = React.useState<number>(moment().month());
    const [year, setYear] = React.useState<number>(moment().year());

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isMoment(_value)) {
            setMonth(_value.month());
                setYear(_value.year());
        } else if ('start' in _value && isMoment(_value.start)) {
            setMonth(_value.start.month());
            setYear(_value.start.year());
        }
    }, [_value]);

    const onChangeHandler = (year: number, month: number, day: number) => {

        if (isDateRange(value)) {
            if (value.start == null || (value.start && value.end)) {
                setValue({start: moment([year, month, day]), end: null});
            } else {
                setValue({start: value.start, end: moment([year, month, day])});
            }
        } else {
            setValue(moment([year, month, day]));
        }

    };

    React.useEffect(() => {
        onChange(value);
    }, [value]);

    const onChangeMonthHandler = (year: number, month: number) => {
        setMonth(month);
        setYear(year);
        setIsOpen(false);
    };

    return (
        <div className={className}>
            <Grid width="100%">
                <Item width="50%">
                    <TextButton
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {moment([year, month]).format('MMM YYYY')}
                        <CaretDown spacing="left" />
                    </TextButton>
                </Item>
                <Item width="50%" horizontalAlignment="flex-end">
                    <StyledButtonGroup>
                        <TextButton
                            onClick={() => {
                                const prevMonth = moment([year, month]).subtract(1, 'month');
                                if (prevMonth.isAfter(moment([startYear - 1, 11]), 'month')) {
                                    setMonth(prevMonth.month());
                                    setYear(prevMonth.year());
                                }

                            }}
                        >
                            <ArrowLeft size="s" />
                        </TextButton>
                        <TextButton
                            onClick={() => {
                                const nextMonth = moment([year, month]).add(1, 'month');
                                if (nextMonth.isBefore(moment([endYear + 1, 0]), 'month')) {
                                    setMonth(nextMonth.month());
                                    setYear(nextMonth.year());
                                }

                            }}
                        >
                            <ArrowRight />
                        </TextButton>
                    </StyledButtonGroup>
                </Item>
            </Grid>

            {isOpen && (
                <MonthSelect
                    startYear={startYear}
                    endYear={endYear}
                    selectedDate={value}
                    selectedYear={year}
                    selectedMonth={month}
                    onChange={onChangeMonthHandler}
                />
            )}
            {!isOpen && (
                <DaySelect
                    amountMonths={2}
                    value={value}
                    onChange={onChangeHandler}
                    month={month}
                    year={year}
                />
            )}

        </div>
    );
};

const StyledCalendar = styled(Calendar)`
    width: 280px;

    ${TextButton} {
        margin-bottom: 25px;
    }
`;

export default StyledCalendar;
