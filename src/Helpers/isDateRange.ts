import moment from 'moment';
import { DateRange } from '../interfaces/Date';

export default (value: moment.Moment | DateRange): value is DateRange => {
    if ('start' in value && 'end' in value) {
        return true;
    } else {
        return false;
    }
};
