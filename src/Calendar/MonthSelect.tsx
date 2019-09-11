import moment, { isMoment } from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import { FixedSizeList as List } from 'react-window';
import isDateRange from '../Helpers/isDateRange';
import { DateRange } from '../interfaces/Date';

interface Month {
    selected: boolean;
    selectedDateInMonth: boolean;
    isInSelectedRange: boolean;
    disabled: boolean;
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

    ${({selected, selectedDateInMonth, isInSelectedRange, theme: { color}}) => {
        let backgroundColor = 'none';
        let textColor = color.black;
        let borderColor = 'rgba(0,0,0,0)';
        if (selected) {
            backgroundColor = color.primary;
            textColor = color.white;
        } else if (selectedDateInMonth) {
            borderColor = color.primary;
        } else if (isInSelectedRange) {
            borderColor = color.blue30;
        }

        return `
            background: ${backgroundColor};
            color: ${textColor};
            border-bottom: 2px solid ${borderColor};
        `;
    }};

    ${({disabled, theme: { color }}) => {

        if (disabled) {
            return `
                background: ${color.gray20};
                color: ${color.gray70};
                cursor: default;
            `;
        }

        return `
            cursor: pointer;
            &:hover {
                background: ${color.blue90};
                color: ${color.white};
            }
        `;
    }}
`;

const Title = styled.div`
    width: 100%;
    font-weight: 500;
    font-size: 14px;
`;

interface Calendar {
    className?: string;
    year: number;
    style?: React.CSSProperties;
    selectedMonth: number;
    selectedYear: number;
    selectedDate: moment.Moment | DateRange;
    onChange(year: number, month: number): void;
}

const isMonthSelected = (selected: moment.Moment | DateRange, month: moment.Moment) => {
    if (isDateRange(selected)) {
        if (selected.start && selected.end) {
            return selected.start.isSame(month, 'month') || selected.end.isSame(month, 'month');
        } else if (selected.start) {
            return selected.start.isSame(month, 'month');
        } else {
            return false;
        }
    } else {
        return selected.isSame(month);
    }
};

const isInSelectedRange = (selected: moment.Moment | DateRange, month: moment.Moment) => {
    if (isDateRange(selected) && selected.start && selected.end) {
        return month.isBetween(selected.start, selected.end, 'month');
    } else {
        return false;
    }
};

const isDisabled = (selected: moment.Moment | DateRange, month: number, year: number) => {
    if (isDateRange(selected) && selected.start && selected.end === null) {
        return moment([year, month]).isBefore(selected.start, 'month');
    }

    return false;
};

const Calendar = styled(({className, onChange, style, year,
    selectedMonth, selectedYear, selectedDate}: Calendar) => {

    const months = moment.monthsShort('-MMM-');
    return (
        <div className={className} style={style}>
            <Title>{year}</Title>
            {months.map((m, index) => {
                const disabled = isDisabled(selectedDate, index, year);
                const onClick = !disabled ? () => onChange(year, index) : undefined;
                return (
                    <Month
                        onClick={onClick}
                        key={m}
                        disabled={disabled}
                        isInSelectedRange={isInSelectedRange(selectedDate, moment([year, index]))}
                        selected={selectedMonth === index && selectedYear === year}
                        selectedDateInMonth={isMonthSelected(selectedDate, moment([year, index]))}
                    >
                        {m}
                    </Month>
                );
            })}
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
    selectedDate: moment.Moment | DateRange;
    onChange(year: number, month: number): void;
}

interface RowData {
   selectedDate: moment.Moment;
   selectedMonth: number;
   startYear: number;
   selectedYear: number;
   onChange(year: number, month: number): void;
}

interface Row {
    data: RowData;
    index: number;
    style: React.CSSProperties;
}

const Row = ({ data, index, style }: Row) => (
    <Calendar
        style={style}
        selectedDate={data.selectedDate}
        selectedMonth={data.selectedMonth}
        selectedYear={data.selectedYear}
        year={data.startYear + index}
        onChange={data.onChange}
    />
  );

export const MonthSelect = styled(({className, onChange, selectedMonth,
    selectedYear, selectedDate, startYear, endYear}: MonthSelect) => {

    const onChangeHandler = (year: number, month: number) => {
        onChange(year, month);
    };

    const ref = React.useRef<List>(null);

    React.useEffect(() => {
        if (ref.current) {
            let scrollToItem;
            if ('start' in selectedDate && selectedDate.start) {
                scrollToItem = selectedDate.start.year() - startYear;
                ref.current.scrollToItem(scrollToItem, 'center');
            } else if (isMoment(selectedDate)) {
                scrollToItem = selectedDate.year() - startYear;
                ref.current.scrollToItem(scrollToItem, 'center');
            }
        }

    }, [selectedDate]);

    return (
        <div className={className}>
            <List
                ref={ref}
                itemData={
                    {
                        selectedDate,
                        selectedMonth,
                        selectedYear,
                        onChange: onChangeHandler,
                        startYear
                    }
                }
                height={350}
                itemCount={endYear - startYear + 1}
                itemSize={100}
                width={300}
            >
                {Row}
            </List>
        </div>
    );
})`
    margin-bottom: 25px;
`;
