import * as React from 'react';
import styled from 'styled-components';
import Month from './Month';

interface Calendar {
    className?: string;
    year: number;
    month: number;
}

export const Calendar = ({ className, year, month }: Calendar) => {
    return (
        <div className={className}>
            <Month year={year} month={month} />
        </div>
    );
};

export default styled(Calendar)``;
