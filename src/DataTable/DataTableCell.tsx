import * as React from 'react';
import styled from 'styled-components';

const InnerCell = styled.div`
    padding: 0px 20px;
    font-weight: normal;
    color: #5f5c5c;
    font-size: 12px;
`;

interface CellProps {
    children?: string | JSX.Element | Array<string | JSX.Element>;
    className?: string;
}

const Cell = ({children, className}: CellProps) => {
    return (
        <td className={className}>
            <InnerCell>{children}</InnerCell>
        </td>
    );
};

const StyledCell = styled(Cell)`
    height: 40px;
`;

export default StyledCell;
