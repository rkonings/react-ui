import * as React from 'react';
import styled from 'styled-components';

const HeaderCellInner = styled.div`
    padding: 0 20px;
    font-weight: normal;
    color: #a5a5a5;
    font-size: 12px;
`;

interface HeaderCellProps {
    children: string | JSX.Element | Array<string | JSX.Element>;
    width?: number;
    className?: string;
}

const HeaderCell = ({children, className}: HeaderCellProps) => {
    return (
        <th className={className}>
            <HeaderCellInner >{children}</HeaderCellInner>
        </th>
    );
};

const StyledHeaderCell = styled(HeaderCell)`
    ${({width}) => width ? `width: ${width}px` : null}
    text-align: left;
`;

export default StyledHeaderCell;
