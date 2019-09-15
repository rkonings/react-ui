import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import TextButton from '../Button/TextButton';
import StyledButtonGroup from '../ButtonGroup/ButtonGroup';
import { Grid, Item } from '../Grid';
import isDateRange from '../Helpers/isDateRange';
import { ArrowLeft, ArrowRight, CaretDown } from '../Icon/index';
import DateRangeInput from '../Input/DateInput/DateRangeInput';
import { DateRange } from '../interfaces/Date';
import Month from './Month';
import { MonthSelect } from './MonthSelect';

interface Calendar {
    className?: string;
    value: DateRange | null;
    startYear: number;
    endYear: number;
    width: number;
    onChange?(value: DateRange): void;
    onFocus?(): void;
    onBlur?(): void;
}

interface DaySelect {
    className?: string;
    month: number;
    year: number;
    value: DateRange | null;
    amountMonths: number;
    potentialRange?: DateRange | null;
    onChangePotentialRange?(date: moment.Moment): void;
    onChange(selectedDate: moment.Moment): void;
}
const DaySelect = styled(({className, value, onChange, month, year,
    potentialRange, onChangePotentialRange, amountMonths = 3}: DaySelect) => {

    const months = [];
    const monthYear = moment([year, month]);

    for (let i = 0; i < amountMonths; i++) {
        months.push(
            <Month
                key={i}
                value={value}
                onChange={onChange}
                month={monthYear.month()}
                year={monthYear.year()}
                potentialRange={potentialRange}
                onChangePotentialRange={onChangePotentialRange}
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

const Calendar = ({className, value: _value, onChange,
    startYear, endYear, width, onBlur, onFocus}: Calendar) => {

    const [value, _setValue] = React.useState<DateRange | null>(null);
    const [month, setMonth] = React.useState<number>(moment().month());
    const [year, setYear] = React.useState<number>(moment().year());

    const [selectingMode, setSelectingMode] = React.useState<'START_DATE' | 'END_DATE'>('START_DATE');
    const [potentialRange, setPotentialRange] = React.useState<DateRange | null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (_value) {
            if (_value.start) {
                setMonth(_value.start.month());
                setYear(_value.start.year());
            } else {
                const now = moment();
                setMonth(now.month());
                setYear(now.year());
            }
        }

        _setValue(_value);

    }, [_value]);

    const changePotentialRange = (date: moment.Moment) => {
        if (value && selectingMode === 'END_DATE' && value.start) {
            setPotentialRange({start: value.start, end: date});
        } else {
            setPotentialRange(null);
        }
    };

    const setValue = (value: DateRange) => {
        _setValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    const onChangeHandler = (selectedDate: moment.Moment) => {
        if (selectingMode === 'START_DATE') {
            if (value) {
                if ((value.end && selectedDate.isBefore(value.end, 'day')) || value && !value.end) {
                    setValue({...value, start: selectedDate});

                } else {
                    setValue({end: null, start: selectedDate});
                }
            } else {
                setValue({start: selectedDate, end: null});
            }
            setSelectingMode('END_DATE');

        } else {

            if (value) {

                if (value && value.start && selectedDate.isAfter(value.start, 'day')) {
                    setValue({...value, end: selectedDate});
                    setSelectingMode('START_DATE');
                } else {
                    setValue({...value, start: selectedDate});
                }
            } else {
                setValue({start: null, end: selectedDate});
            }

        }

    };

    const onChangeMonthHandler = (year: number, month: number) => {
        setMonth(month);
        setYear(year);
        setIsOpen(false);
    };

    const onChangeStartDateInputHandler = (date: moment.Moment) => {
        setMonth(date.month());
        setYear(date.year());
        if (value && isDateRange(value)) {
            setValue({...value, start: date});
        }

    };

    const onChangeEndDateInputHandler = (date: moment.Moment) => {
        setMonth(date.month());
        setYear(date.year());
        if (value && isDateRange(value)) {
            setValue({...value, end: date});
        }
    };

    const onDateRangeInputFocus = (type: 'START_DATE' | 'END_DATE') => {
        setSelectingMode(type);
    };

    const getInputField = () => {
        const startDate = (value) ? value.start : null;
        const endDate = (value) ? value.end : null;
        return (
            <DateRangeInput
                onFocus={onDateRangeInputFocus}
                startDate={startDate}
                endDate={endDate}
                onChangeStartDate={onChangeStartDateInputHandler}
                onChangeEndDate={onChangeEndDateInputHandler}
            />
        );

    };

    return (
        <div
            onFocus={() => onFocus && onFocus()}
            onBlur={() => onBlur && onBlur()}
            className={className}
            tabIndex={0}
        >
            {getInputField()}
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
                    width={width}
                />
            )}
            {!isOpen && (
                <DaySelect
                    amountMonths={2}
                    value={value}
                    onChange={onChangeHandler}
                    month={month}
                    year={year}
                    potentialRange={potentialRange}
                    onChangePotentialRange={changePotentialRange}
                />
            )}

        </div>
    );
};

const StyledCalendar = styled(Calendar)`
    width: ${({width}) => width}px;

    ${TextButton} {
        margin-bottom: 25px;
    }

    &:focus {
        outline: none;
    }
`;

export default StyledCalendar;
