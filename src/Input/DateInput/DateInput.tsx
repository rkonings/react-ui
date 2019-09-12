import moment from 'moment';
import * as React from 'react';
import TextField from '../TextField/TextField';

const DATE_FORMAT = 'D-M-YYYY';

interface DateInput {
    value: moment.Moment;
    dateFormat?: string;
    onChange(date: moment.Moment): void;
}

export default ({value, onChange, dateFormat = DATE_FORMAT}: DateInput) => {

    const [date, setDate] = React.useState<string>(value.format(dateFormat));

    React.useEffect(() => {
        setDate(value.format(dateFormat));
    }, [value]);

    const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        setDate(value);
        if (moment(value, dateFormat, true).isValid()) {
           onChange(moment(value, dateFormat));
        }
    };

    return (<TextField value={date} onChange={onChangeHandler} />);
};
