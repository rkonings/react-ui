import moment from 'moment';
import React, { createContext, useContext, useReducer } from 'react';
import { Calendar } from './';
import { Event } from './interfaces';

interface EventCalendarState {
    hoverEvent: Event | null;
}

type EventCalendarAction =
  | { type: 'increment' }
  | { type: 'events' }
  | { type: 'hoverEvent'; event: Event | null };

const reducer = (state: EventCalendarState, action: EventCalendarAction) => {
    switch (action.type) {
      case 'hoverEvent':
        return {
          ...state,
          hoverEvent: action.event
        };

      default:
        return state;
    }
  };

  export const StateContext = createContext<[EventCalendarState,
    React.Dispatch<EventCalendarAction>]>([{} as EventCalendarState,
        (action: EventCalendarAction) => null ]);

export const useStateValue = () => useContext(StateContext);

const events: Event[] = [
    {
        start: '2019-01-15',
        end: '2019-02-16',
        title: 'Event 4',
        id: '0'
    },
    {
        start: '2019-01-15',
        end: '2019-01-16',
        title: 'Event 4',
        id: '1'
    },
    {
        start: '2019-01-01',
        end: '2019-01-10',
        title: 'Event 1',
        id: '2'
    },
    {
        start: '2019-01-02',
        end: '2019-01-05',
        title: 'Event 2',
        id: '3'
    },
    {
        start: '2019-01-12',
        end: '2019-01-15',
        title: 'Event 3',
        id: '4'
    },
    {
        start: '2019-01-01',
        end: '2019-01-02',
        title: 'Event 6',
        id: '5'
    },
];

const sortEvents = (events: Event[]) => {
    events.sort((a, b) => moment(a.start).unix() - moment(b.start).unix());
};

const prepareEvents = (events: Event[]) => {
    sortEvents(events);
    events.forEach((event, index) => {
        if (index > 0) {
            const prevEvent = events[index - 1];
            const start = moment(event.start);
            if (start.isSameOrAfter(prevEvent.start) && start.isSameOrBefore(prevEvent.end) ) {
                event.index = prevEvent.index ? prevEvent.index + 1 : 1;
            }

        } else {
            event.index = 0;
        }
    });
};

const EventCalendar = () => {

    prepareEvents(events);

    const initialState: EventCalendarState = {
        hoverEvent: null
    };

    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            <div>
                <Calendar events={events}  />
            </div>
        </StateContext.Provider>
    );
};

export default EventCalendar;
