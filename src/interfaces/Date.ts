import moment from 'moment';

export type Date = moment.Moment | null;
export interface DateRange {
    start: moment.Moment | null;
    end: moment.Moment | null;
}
