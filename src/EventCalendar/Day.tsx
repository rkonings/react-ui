import * as React from 'react';
import styled from 'styled-components';
import { useStateValue } from './EventCalendar';
import { getEventsOnDay } from './helpers/getEventsOnDate';
import { Event } from './interfaces';

interface Day {
    className?: string;
    day: number;
    date: string;
    isInMonth?: boolean;
}

const Inner = styled.div`
    padding: 15px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
`;

const EventPlaceHolder = styled.div`
    width: 100%;
    height: 10px;
    margin-bottom: 5px;
`;

const EventsWrapper = styled.div`
    position: absolute;
    top: 40px;
    left:0;
    width: 100%;
`;

const getOrderEvents = (events: Event[], amount: number = 5 ) => {
    const ordered: Array<null|Event> = Array(amount).fill(null);
    for (let index = 0; index < amount; index++) {
        const eventOnIndex = events.find((event) => event.index === index);
        if (eventOnIndex) {
            ordered[index] = eventOnIndex;
        }

const getEventRangeType = (event: Event, date: string): EventRangeType => {
    if (event.start === date) {
        return 'START';
    }
    if (event.end === date) {
        return 'END';
    }
    return 'MIDDLE';
};

export default styled(({className, day, events, date}: Day) => {

    const [{ hoverEvent }, dispatch] = useStateValue();

    const eventRangeMouseOverHandler = (event: Event) => {
        dispatch({
            type: 'hoverEvent',
            event
        });
    };

    const eventRangeMouseOutHandler = () => {
        dispatch({
            type: 'hoverEvent',
            event: null
        });
    };

    const [, drop] = useDrop({
        accept: [ItemTypes.Event],
        hover(dragItem: { type: string; id: string }, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }

            if (dragOver === date) {
                return;
            }

            dispatch({
                type: 'changeEventDate',
                id: dragItem.id,
                date
            });
        },
    });

    let ordered;
    if (isInMonth) {
        drop(ref);
        const eventsOnDay = getEventsOnDay(events, date);
        ordered = getOrderEvents(eventsOnDay);
    }

    return (
        <div className={className}>
        <div ref={ref} className={className}>
            <Inner>
                {day}
            </Inner>
            <EventsWrapper>
                {ordered.map( (event, key) => {
                    if (event) {
                        return (
                            <EventRange
                                hover={!!(hoverEvent && event.id === hoverEvent.id)}
                                onMouseOver={() => eventRangeMouseOverHandler(event)}
                                onMouseOut={() => eventRangeMouseOutHandler()}
                                type={getEventRangeType(event, date)}
                                key={key}
                            />
                        );
                    } else {
                        return <EventPlaceHolder key={key} />;
                    }

                })}
            </EventsWrapper>
        </div>
    );
})`
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    position: relative;
    font-size: 12px;
    color: ${({theme: { color }}) => color.gray80};
    border: 1px solid ${({theme: { color }}) => color.gray20};
    border-left: none;
    border-top: none;
    ${({isInMonth}) => isInMonth ? null : 'opacity: 0.3;'}
`;
