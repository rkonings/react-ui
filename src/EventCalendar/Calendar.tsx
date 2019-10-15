import * as React from 'react';
import styled from 'styled-components';
import { Event } from './interfaces';
import Month from './Month';

interface Calendar {
    className?: string;
    events: Event[];
}

export const Calendar = ({className, events}: Calendar) => {
export const Calendar = ({className, year, month}: Calendar) => {
    return (
        <div className={className}>
            <Month year={year} month={month}  />
        </div>
    );
};

export default styled(Calendar)``;
