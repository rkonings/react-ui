import * as React from 'react';
import styled from 'styled-components';

type CellAlign = 'LEFT' | 'CENTER' | 'RIGHT';

export interface CellProps {
    children?: string | JSX.Element | Array<string | JSX.Element>;
    align?: CellAlign;
    className?: string;
    width?: number;
}

interface CellInnerProps {
    align?: CellAlign;
    width?: number;
}

const CellAlignment = ({align}: CellInnerProps) => {
    if (align === 'CENTER') {
        return `justify-content: center;`;
    } else if (align === 'RIGHT') {
        return `justify-content: flex-end;`;
    } else {
        return 'justify-content: flex-start';
    }
};

export const CellInner = styled.span<CellInnerProps>`
    padding: 0 20px;
    align-items: center;
    ${({theme}) => `color: ${theme.color.black};`}
    ${({width}) => width ? `width: ${width}px` : `width: 100%;`}
    display: flex;
    ${CellAlignment};
    height: 40px;
    box-sizing: border-box;
`;

const Cell = ({children, className, width, align}: CellProps) => {
    return (
        <td className={className}>
            <CellInner width={width} align={align}>{children}</CellInner>
        </td>
    );
};

const StyledCell = styled(Cell)`
    font-size: 12px;
`;

export default StyledCell;
