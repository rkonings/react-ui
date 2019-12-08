import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import { DateRange } from '../interfaces/Date';

interface Day {
    className?: string;
    day: number;
    month: number;
    year: number;
    inCurrentMonth: boolean;
    isSelected: boolean;
    inPotentialRange: boolean;
    isDisabled: boolean;
    isDayInRange: boolean;
    potentialRange?: DateRange | null;
    onChangePotentialRange?(date: moment.Moment): void;
    onClick(selectedDate: moment.Moment): void;
}

export default styled(
    ({
        className,
        day,
        month,
        year,
        inCurrentMonth,
        isDisabled,
        onClick,
        onChangePotentialRange,
    }: Day) => {
        return (
            <div
                onClick={() => {
                    if (inCurrentMonth && !isDisabled) {
                        onClick(moment([year, month, day]));
                    }
                }}
                onMouseOver={() => {
                    if (
                        inCurrentMonth &&
                        !isDisabled &&
                        onChangePotentialRange
                    ) {
                        onChangePotentialRange(moment([year, month, day]));
                    }
                }}
                className={className}
            >
                {day}
            </div>
        );
    }
)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${100 / 7}%;
    height: 40px;
    font-size: 12px;

    ${({
        isSelected,
        isDisabled,
        inPotentialRange,
        inCurrentMonth,
        isDayInRange,
        theme: {
            color,
            calendar: { day },
        },
    }) => {
        if (inPotentialRange && inCurrentMonth) {
            return `
                background: ${day.inPotentialRange.backgroundColor};
                color: ${day.inPotentialRange.color};
            `;
        } else if (isSelected && inCurrentMonth) {
            return `
                background: ${day.selected.backgroundColor};
                color: ${day.selected.color};
            `;
        } else if (isDisabled && inCurrentMonth) {
            return `
                background: ${day.disabled.backgroundColor};
                color: ${day.disabled.color};
                cursor: default;
            `;
        } else if (isDayInRange && inCurrentMonth) {
            return `
                background: ${day.inRange.backgroundColor};
                color: ${day.inRange.color};
            }
        `;
        } else if (!inCurrentMonth) {
            return `
                color: ${day.notInMonth.color};
            `;
        }

        return;
    }}

    ${({
        isDisabled,
        inCurrentMonth,
        theme: {
            color,
            calendar: { day },
        },
    }) => {
        if (!isDisabled && inCurrentMonth) {
            return `
                cursor: pointer;
                &:hover {
                    background: ${day.default.hover.backgroundColor};
                    color: ${day.default.hover.color};
                }
            `;
        }
        return;
    }}
`;
