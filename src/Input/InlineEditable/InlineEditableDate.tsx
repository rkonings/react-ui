import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import Month from '../../Calendar/Month';
import { MonthSelect } from '../../Calendar/MonthSelect';
import { Grid, Item } from '../../Grid';
import { Date } from '../../interfaces/Date';

import * as Yup from 'yup';
import Button from '../../Button/Button';
import TextButton from '../../Button/TextButton';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { Agenda, ArrowLeft, ArrowRight, CaretDown, Close } from '../../Icon';
import Popover from '../../Popover/Popover';

interface DatePicker {
    className?: string;
    onChange?: (date: Date) => void;
    value?: Date;
    startYear?: number;
    endYear?: number;
    validationSchema: Yup.ObjectSchema;
    field: string;
    placeholder?: string;
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

const Clear = styled.div`
    display: none;
    ${Close} {
        margin-right: 4px;
        margin-left: 4px;
        height: 10px;
        width: 10px;
    }
`;

const DateLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:hover {
        ${Clear} {
            display: flex;
        }
    }
`;

const Content = styled.div`
    width: 300px;
`;

const Value = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    font-size: 12px;
`;

const DatePicker = ({
    className,
    value,
    onChange,
    field,
    validationSchema,
    startYear = 2000,
    endYear = 2030,
    placeholder = 'select a date',
}: DatePicker) => {
    const [openMonthSelect, setOpenMonthSelect] = React.useState(false);
    const [error, setError] = React.useState<Yup.ValidationError | null>(null);
    const [currentDate, setCurrentDate] = React.useState<Date>(value || null);
    const [selectedDate, setSelectedDate] = React.useState<Date>(value || null);

    const [year, setYear] = React.useState(
        (value && value.year()) || moment().year()
    );
    const [month, setMonth] = React.useState(
        (value && value.month()) || moment().month()
    );

    React.useEffect(() => {
        setMonth((value && value.month()) || moment().month());
        setYear((value && value.year()) || moment().year());
        setSelectedDate(value || null);
    }, [value]);

    const onCalendarChange = (date: Date) => {
        if (date) {
            validationSchema
                .validateAt(field, { [field]: date })
                .then(_ => {
                    setError(null);
                    setSelectedDate(date);
                })
                .catch(error => setError(error));
        }
    };

    const onMonthSelect = (year: number, month: number) => {
        setYear(year);
        setMonth(month);
        setOpenMonthSelect(false);
    };

    const cancel = () => {
        setSelectedDate(currentDate);
    };

    const save = () => {
        if (error) {
            return;
        }
        setCurrentDate(selectedDate);
        if (onChange) {
            onChange(selectedDate);
        }
    };

    const clear = () => {
        setYear(moment().year());
        setMonth(moment().month());
        setCurrentDate(null);
        setSelectedDate(null);
        if (onChange) {
            onChange(null);
        }
    };

    return (
        <div className={className}>
            <Popover
                link={open => (
                    <DateLabel>
                        <span onClick={open}>
                            <Agenda />
                        </span>
                        <Value onClick={open}>
                            {currentDate
                                ? currentDate.format(DATE_FORMAT)
                                : placeholder}
                        </Value>
                        {selectedDate && (
                            <Clear onClick={() => clear()}>
                                <Close />
                            </Clear>
                        )}

                        <span onClick={open}>
                            <CaretDown />
                        </span>
                    </DateLabel>
                )}
            >
                {setOpen => (
                    <Content>
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
                                }}
                                amountMonths={1}
                                month={month}
                                year={year}
                                value={selectedDate}
                            />
                        )}
                        <ButtonGroup size="s">
                            <TextButton
                                onClick={() => {
                                    cancel();
                                    setOpen(false);
                                }}
                            >
                                cancel
                            </TextButton>
                            <Button
                                type="primary"
                                onClick={() => {
                                    save();
                                    setOpen(false);
                                }}
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </Content>
                )}
            </Popover>
        </div>
    );
};

export default styled(DatePicker)`
    width: 180px;
    ${Month} {
        text-align: left;
        width: 300px;
    }
`;
