import * as React from 'react';
import styled from 'styled-components';

import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';

interface DataTableProps {
    className?: string;
}

const DataTable = ({ className }: DataTableProps) => {
    return (
        <table className={className}>
            <DataTableHeader />
            <DataTableBody />
        </table>
    );
};

const StyledDataTable = styled(DataTable)`
    font-family: ${({ theme: { fontFamily } }) => fontFamily};
    border-spacing: 0;
    border-collapse: collapse;
    width: 500px;

    th,
    td {
        padding:0;
    }
`;

export default StyledDataTable;
