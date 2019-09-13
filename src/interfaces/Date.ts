import moment from 'moment';
export interface DateRange {
    start: moment.Moment | null;
    end: moment.Moment | null;
}
