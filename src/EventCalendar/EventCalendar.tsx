import * as moment from 'moment';
import React, { createContext, useContext, useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Calendar } from './';
import { getEventsOnDay } from './helpers/getEventsOnDate';
import { moveEventToDate } from './helpers/moveEventToDate';
import { Event } from './interfaces';

export const ItemTypes = {
    Event: 'event'
};

interface EventCalendarState {
    hoverEvent: Event | null;
    events: Event[];
    dragOver?: string;
    year: number;
    month: number;
}

type EventCalendarAction =
  | { type: 'dragOver', date: string; }
  | { type: 'changeEventDate', id: string, date: string }
  | { type: 'hoverEvent'; event: Event | null };

export const sortEvents = (events: Event[]) => {
    events.sort((a, b) => {
        const primarySort = moment(a.start).unix() - moment(b.start).unix();
        if (primarySort !== 0) {
           return primarySort;
        }

        const diffA = moment(a.end).diff(moment(a.start), 'days');
        const diffB = moment(b.end).diff(moment(b.start), 'days');

        return diffB - diffA;
     });
};

export const getAvailableIndex = (events: Event[]) => {
    for (let i = 0; i <= events.length; i++) {
        if (events.findIndex((event) => event.index === i) === -1) {
            return i;
        }
    }

    return 0;
};

export const prepareEvents = (events: Event[]) => {
    events.forEach((event) => event.index = 0);
    sortEvents(events);

    const queue = [...events];
    const processed: Event[] = [];

    while (queue.length > 0) {
        const event = queue.shift() as Event;
        const eventsOnStartDate = getEventsOnDay(processed, event.start);

        const availableIndex = getAvailableIndex(eventsOnStartDate);
        event.index = availableIndex;

        processed.push(event);

    }

    return processed;

};

const reducer = (state: EventCalendarState, action: EventCalendarAction) => {
    switch (action.type) {
        case 'hoverEvent':
            return {
                ...state,
                hoverEvent: action.event
            };

        case 'dragOver':
            return {
                ...state,
                dragOver: action.date
            };

        case 'changeEventDate':
            const result = moveEventToDate([...state.events], action.id, action.date);
            const events = prepareEvents(result);

            return {
                ...state,
                dragOver: action.date,
                events
            };

      default:
        return state;
    }
  };

  export const StateContext = createContext<[EventCalendarState,
    React.Dispatch<EventCalendarAction>]>([{} as EventCalendarState,
        (action: EventCalendarAction) => null ]);

export const useStateValue = () => useContext(StateContext);
interface EventCalendar {
    events: Event[];
    year: number;
    month: number;
}
const EventCalendar = ({events, year, month}: EventCalendar) => {

    prepareEvents(events);

    const initialState: EventCalendarState = {
        hoverEvent: null,
        events,
        year,
        month
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <StateContext.Provider value={useReducer(reducer, initialState)}>
                <div>
                    <Calendar year={year} month={month}  />
                </div>
            </StateContext.Provider>
        </DndProvider>
    );
};

export default EventCalendar;
