import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import TextField from '../TextField/TextField';

const DATE_FORMAT = 'D-M-YYYY';

interface DateRangeInput {
    className?: string;
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
    dateFormat?: string;
    onFocus?(selectingMode: 'START_DATE' | 'END_DATE'): void;
    onChangeStartDate(date: moment.Moment): void;
    onChangeEndDate(date: moment.Moment): void;
}

export default styled(
    ({
        className,
        startDate,
        endDate,
        onChangeStartDate,
        onChangeEndDate,
        onFocus,
        dateFormat = DATE_FORMAT,
    }: DateRangeInput) => {
        const formattedStartDate = startDate
            ? startDate.format(dateFormat)
            : '';
        const formattedEndDate = endDate ? endDate.format(dateFormat) : '';
        const [startValue, setStartValue] = React.useState<string>(
            formattedStartDate
        );
        const [endValue, setEndValue] = React.useState<string>(
            formattedEndDate
        );

        React.useEffect(() => {
            const formattedDate = startDate ? startDate.format(dateFormat) : '';
            setStartValue(formattedDate);
        }, [startDate]);

        React.useEffect(() => {
            const formattedDate = endDate ? endDate.format(dateFormat) : '';
            setEndValue(formattedDate);
        }, [endDate]);

        const onChangeStartDateHandler = (
            event: React.FormEvent<HTMLInputElement>
        ) => {
            const value = event.currentTarget.value;

            setStartValue(value);
            if (moment(value, dateFormat, true).isValid()) {
                onChangeStartDate(moment(value, dateFormat));
            }
        };

        const onChangeEndDateHandler = (
            event: React.FormEvent<HTMLInputElement>
        ) => {
            const value = event.currentTarget.value;

            setEndValue(value);
            if (
                moment(value, dateFormat, true).isValid() &&
                moment(value, dateFormat).isAfter(
                    moment(startValue, dateFormat),
                    'day'
                )
            ) {
                onChangeEndDate(moment(value, dateFormat));
            }
        };

        return (
            <div className={className}>
                <TextField
                    value={startValue}
                    onChange={onChangeStartDateHandler}
                    onFocus={() => onFocus && onFocus('START_DATE')}
                />
                <span>-</span>
                <TextField
                    value={endValue}
                    onChange={onChangeEndDateHandler}
                    onFocus={() => onFocus && onFocus('END_DATE')}
                />
            </div>
        );
    }
)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        width: 100px;
        text-align: center;
    }

    input {
        font-size: 12px;
        padding: 8px 10px;
    }
`;
