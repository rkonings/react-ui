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
    onClick(year: number, month: number, day: number): void;
}

export default styled(({className, day, month, year, inCurrentMonth,
    isDisabled, onClick, onChangePotentialRange}: Day) => {
    return (
        <div
            onClick={() => {
                if (inCurrentMonth && !isDisabled) {
                    onClick(year, month, day);
                }
            }}
            onMouseOver={() => {
                if (inCurrentMonth && !isDisabled && onChangePotentialRange) {
                    onChangePotentialRange(moment([year, month, day]));
                }
            }}
            className={className}
        >
            {day}
        </div>
    );
})`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${100 / 7}%;
    height: 40px;
    font-size: 12px;

    ${({isSelected, isDisabled, inPotentialRange, inCurrentMonth, isDayInRange, theme: { color }}) => {
        if (inPotentialRange && inCurrentMonth) {
            return `
                background: ${color.blue20};
                color: ${color.black};
            `;

        } else if (isSelected && inCurrentMonth) {
            return `
                background: ${color.primary};
                color: ${color.white};
            `;

        } else if (isDisabled && inCurrentMonth) {
            return `
                background: ${color.gray20};
                color: ${color.gray70};
                cursor: default;
            `;
        } else if (isDayInRange && inCurrentMonth) {
            return `
                background: ${color.blue10};
            }
        `;
        } else if (!inCurrentMonth) {
            return `
                color: ${color.gray40};
            `;
        }

        return;
    }}

    ${({isDisabled, inCurrentMonth, theme: { color }}) => {
        if (!isDisabled && inCurrentMonth) {
            return `
                cursor: pointer;
                &:hover {
                    background: ${color.primary};
                    color: ${color.white};
                }
            `;
        }
        return;
    }}
`;
