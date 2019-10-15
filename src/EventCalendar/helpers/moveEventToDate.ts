import * as moment from 'moment';
import { Event } from '../interfaces';

export const moveEventToDate = (events: Event[], id: string, date: string) => {
    const event = events.find((item) => item.id === id);
    if (event) {
        const diff = moment(event.end).diff(moment(event.start), 'days');
        event.start = date;
        event.end = moment(date).add(diff, 'days').format('YYYY-MM-DD');
    }
    return events;
};
