import { Event } from '../interfaces';

export const findEventById = (events: Event[], id: string) => {
    return events.find(event => event.id === id);
};
