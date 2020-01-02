import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import Month from '../../Calendar/Month';
import { MonthSelect } from '../../Calendar/MonthSelect';
import { Grid, Item } from '../../Grid';
import { Date } from '../../interfaces/Date';

import TextButton from '../../Button/TextButton';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { Agenda, ArrowLeft, ArrowRight, CaretDown } from '../../Icon';
import Popover from '../../Popover/Popover';
import TextField from '../TextField/TextField';

interface DatePicker {
    className?: string;
    onChange?: (date: Date) => void;
    value?: Date;
    startYear?: number;
    endYear?: number;
}

const DATE_FORMAT = 'D-M-YYYY';
interface DaySelect {
    className?: string;
    month: number;
    year: number;
    value: Date;
    amountMonths: number;
    onChange(selectedDate: moment.Moment): void;
}
export const DaySelect = styled(
    ({
        className,
        value,
        onChange,
        month,
        year,

        amountMonths = 3,
    }: DaySelect) => {
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
                />
            );
            monthYear.add(1, 'month');
        }

        return <div className={className}>{months}</div>;
    }
)``;

const MonthSelectButton = styled(TextButton)`
    margin-left: -18px;
`;

interface Header {
    className?: string;
    year: number;
    month: number;
    startYear: number;
    endYear: number;
    setMonth: (value: React.SetStateAction<number>) => void;
    setYear: (value: React.SetStateAction<number>) => void;
    setOpenMonthSelect: (value: React.SetStateAction<boolean>) => void;
    openMonthSelect: boolean;
}

const Header = styled(
    ({
        className,
        year,
        month,
        setMonth,
        setYear,
        setOpenMonthSelect,
        openMonthSelect,
        startYear,
        endYear,
    }: Header) => {
        return (
            <div className={className}>
                <Grid width="100%">
                    <Item width="50%">
                        <MonthSelectButton
                            onClick={() => setOpenMonthSelect(!openMonthSelect)}
                        >
                            {moment([year, month]).format('MMM YYYY')}
                            <CaretDown spacing="left" />
                        </MonthSelectButton>
                    </Item>
                    <Item width="50%" horizontalAlignment="flex-end">
                        <ButtonGroup>
                            <TextButton
                                onClick={() => {
                                    const prevMonth = moment([
                                        year,
                                        month,
                                    ]).subtract(1, 'month');
                                    if (
                                        prevMonth.isAfter(
                                            moment([startYear - 1, 11]),
                                            'month'
                                        )
                                    ) {
                                        setMonth(prevMonth.month());
                                        setYear(prevMonth.year());
                                    }
                                }}
                            >
                                <ArrowLeft size="s" />
                            </TextButton>
                            <TextButton
                                onClick={() => {
                                    const nextMonth = moment([year, month]).add(
                                        1,
                                        'month'
                                    );
                                    if (
                                        nextMonth.isBefore(
                                            moment([endYear + 1, 0]),
                                            'month'
                                        )
                                    ) {
                                        setMonth(nextMonth.month());
                                        setYear(nextMonth.year());
                                    }
                                }}
                            >
                                <ArrowRight />
                            </TextButton>
                        </ButtonGroup>
                    </Item>
                </Grid>
            </div>
        );
    }
)`
    margin-bottom: 1em;
`;

const DatePicker = ({
    className,
    value,
    onChange,
    startYear = 2000,
    endYear = 2030,
}: DatePicker) => {
    const [openMonthSelect, setOpenMonthSelect] = React.useState(false);

    const [selectedDate, setSelectedDate] = React.useState<Date>(
        value || moment()
    );
    const [inputValue, setInputValue] = React.useState(
        (value && value.format(DATE_FORMAT)) ||
            moment([2019, 8, 2]).format(DATE_FORMAT)
    );

    const [year, setYear] = React.useState(
        (value && value.year()) || moment().year()
    );
    const [month, setMonth] = React.useState(
        (value && value.month()) || moment().month()
    );

    React.useEffect(() => {
        setMonth((value && value.month()) || moment().month());
        setYear((value && value.year()) || moment().year());
        setInputValue(
            (value && value.format(DATE_FORMAT)) || moment().format(DATE_FORMAT)
        );
        setSelectedDate(value || moment());
    }, [value]);

    const onCalendarChange = (date: Date) => {
        if (date) {
            setSelectedDate(date);
            setInputValue(date.format(DATE_FORMAT));

            if (onChange) {
                onChange(date);
            }
        }
    };
    const onTextFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        const date = moment(value, DATE_FORMAT, true);
        if (moment(date).isValid()) {
            setSelectedDate(date);
            setYear(date.year());
            setMonth(date.month());
            if (onChange) {
                onChange(date);
            }
        } else {
            setSelectedDate(null);
        }
    };

    const onMonthSelect = (year: number, month: number) => {
        setYear(year);
        setMonth(month);
        setOpenMonthSelect(false);
    };

    return (
        <div className={className}>
            <Popover
                link={
                    <TextField
                        value={inputValue}
                        onChange={onTextFieldChange}
                        prefix={<Agenda />}
                        postfix={<CaretDown />}
                        grow={true}
                    />
                }
            >
                {setOpen => (
                    <React.Fragment>
                        <Header
                            setOpenMonthSelect={setOpenMonthSelect}
                            openMonthSelect={openMonthSelect}
                            setMonth={setMonth}
                            endYear={endYear}
                            startYear={startYear}
                            month={month}
                            year={year}
                            setYear={setYear}
                        />

                        {openMonthSelect && (
                            <MonthSelect
                                width={300}
                                startYear={startYear}
                                endYear={endYear}
                                selectedMonth={month}
                                selectedYear={year}
                                selectedDate={selectedDate}
                                onChange={onMonthSelect}
                            />
                        )}

                        {!openMonthSelect && (
                            <DaySelect
                                onChange={date => {
                                    onCalendarChange(date);
                                    setOpen(false);
                                }}
                                amountMonths={2}
                                month={month}
                                year={year}
                                value={selectedDate}
                            />
                        )}
                    </React.Fragment>
                )}
            </Popover>
        </div>
    );
};

export default styled(DatePicker)`
    ${Month} {
        text-align: left;
        width: 300px;
    }
`;
