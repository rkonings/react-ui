import React from 'react';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from './EventCalendar';
import { Event } from './interfaces';

export type EventRangeType = 'START' | 'MIDDLE' | 'END';
export interface EventRange {
    type?: EventRangeType;
    hover?: boolean;
    children?: JSX.Element | string;
    className?: string;
    event: Event;
    onMouseOver(): void;
    onMouseOut(): void;
}

export const getEventRangeType = (event: Event, date: string): EventRangeType => {
    if (event.start === date) {
        return 'START';
    }
    if (event.end === date) {
        return 'END';
    }
    return 'MIDDLE';
};

const EventRange = styled(({className, children, onMouseOut, onMouseOver, event}: EventRange) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drag] = useDrag({
        item: { type: ItemTypes.Event, id: event.id },
        isDragging: (monitor) => {
            return event.id === monitor.getItem().id;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(ref);

    return (
        <div
            ref={ref}
            className={className}
            onMouseOver={() => onMouseOver()}
            onMouseOut={() => onMouseOut()}
        >
            {children}
        </div>
    );
})`
    background: ${({hover, theme: { color }}) => hover ? color.secondairy : color.primary};
    color: ${({theme: { color }}) => color.white};
    width: 100%;
    padding-right:1px;
    height: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    /* box-sizing: border-box; */

    ${({type = 'MIDDLE'}) => {
        if (type === 'START') {
            return `
                width: 80%;
                margin-left: 20%;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            `;
        } else if (type === 'END') {
            return `
                width: 80%;
                margin-right: 20%;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            `;
        }

        return null;
    }}
`;

export default EventRange;
