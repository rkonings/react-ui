import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { Data, DataField, DataRow } from '../interfaces/Data';
import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';

interface DataTableProps {
    className?: string;
    data: DataRow[];
    fields: DataField[];
    selectable?: boolean;
    rowToolBar?(row: DataRow): JSX.Element;
}

const DataTable = ({ className, rowToolBar, data, ...props }: DataTableProps) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selected, setSelected] = useState<Set<Data>>(new Set());

    const setSelectedItems = (item: Data) => {
        const newSelected = new Set(selected);
        setSelectAll(false);
        if (selected.has(item)) {
            newSelected.delete(item);
        } else {
            newSelected.add(item);
        }
        setSelected(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelected(new Set());
            setSelectAll(false);
        } else {
            setSelected(new Set(data.map((row) => row.data)));
            setSelectAll(true);
        }
    };

    return (
        <table className={className}>
            <DataTableHeader
                hasRowToolBar={!!rowToolBar}
                toggleSelectAll={toggleSelectAll}
                selectAll={selectAll}
                {...props}
            />
            <DataTableBody
                {...props}
                selected={selected}
                selectAll={selectAll}
                setSelected={setSelectedItems}
                rowToolBar={rowToolBar}
                data={data}
            />
        </table>
    );
};

const StyledDataTable = styled(DataTable)`
    font-family: ${({ theme: { fontFamily } }) => fontFamily};
    border-spacing: 0;
    border-collapse: collapse;
    width: 80%;

    th,
    td {
        padding:0;
    }
`;

export default StyledDataTable;
