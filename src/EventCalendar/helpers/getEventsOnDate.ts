import moment from 'moment';
import { Event } from './../interfaces';

export const getEventsOnDay = (events: Event[], date: string): Event[] => {
    const result = events.filter((event) => {
        const start = moment(event.start).startOf('day').subtract(1, 's');
        const end = moment(event.end).endOf('day').add(1, 's');
        return moment(date).isBetween(start, end, 'h');
    });
    return result;
};
