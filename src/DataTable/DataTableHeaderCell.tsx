import * as React from 'react';
import styled from 'styled-components';
import { ArrowDown, ArrowUp } from '../Icon/index';
import { CellInner, CellProps } from './DataTableCell';

export interface HeaderCellProps extends CellProps {
    sort?: 'ASC' | 'DESC';
}

const HeaderCell = ({children, className, width, align, sort}: HeaderCellProps) => {
    let sortingIcon;
    if (sort === 'ASC') {
        sortingIcon = <ArrowDown />;
    } else if (sort === 'DESC') {
        sortingIcon = <ArrowUp />;
    }
    return (
        <th className={className}>
            <CellInner width={width} align={align}>
                <React.Fragment>
                    {children}
                    {sortingIcon}
                </React.Fragment>
            </CellInner>
        </th>
    );
};

const StyledHeaderCell = styled(HeaderCell)`
    font-size: 12px;
    ${CellInner} {
        ${ArrowDown}, ${ArrowUp} {
            margin-left: 5px;
        }
    }
`;

export default StyledHeaderCell;
