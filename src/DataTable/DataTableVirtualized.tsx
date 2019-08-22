import * as React from 'react';
import { useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';
import CheckBox from '../Input/Checkbox/Checkbox';
import { Data, DataField, DataRow } from '../interfaces/Data';

interface Column {
    type: string;
    fieldName?: string;
    width?: string | number;
    toolbar?(row: DataRow): JSX.Element;
}

interface DataTableVirtualizedProps {
    className?: string;
    data: DataRow[];
    fields: DataField[];
    columns: Column[];
}

interface ItemData {
    rows: DataRow[];
    fields: DataField[];
    selected: Set<Data>;
    columns: Column[];
    setSelectedItems(item: Data): void;
    toggleSelectAll(): void;
}

interface CellProps {
    className?: string;
    data: ItemData;
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
}

const Cell = ({ data, rowIndex, columnIndex, style, className }: CellProps) => {
    const { setSelectedItems, rows, selected, fields, columns } = data;
    const row = rows[rowIndex];
    const column = columns[columnIndex];

    let content;

    switch (column.type) {
        case 'TOOLBAR':
            content = column.toolbar && column.toolbar(row);
        break;
        case 'SELECT':
            content = (
                <CheckBox
                    checked={selected.has(row.data)}
                    onChange={() => setSelectedItems(row.data)}
                    type={'primary'}
                />
            );
        break;
        case 'DATA':
        default:
            const field = fields.find( (f) => f.name === column.fieldName);
            if (field) {
                content = row.data[field.name];
            }

        break;
    }

    return (
      <div
        className={className}
        style={style}
      >
        {content}
      </div>
    );
};

const StyledCell = styled(Cell)<CellProps>`
    display: flex;
    align-items: center;
    ${({rowIndex}) => rowIndex % 2 ? `background: #fbf9f9;` : `` }
    box-sizing: border-box;
    padding: 0 2em;
`;

interface HeaderProps {
    className?: string;
    fields: DataField[];
    selectAll: boolean;
    columns: Column[];
    toggleSelectAll(): void;
    columnWidth(index: number): number;
}

interface HeaderCellProps {
    width: number;
}

const HeaderCell = styled.div<HeaderCellProps>`
    width: ${({width}) => width}px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 2em;
    height: 50px;
    font-weight: bold;
    font-size: 1.1em;
    background: #f7f7f7;
`;

const Header = ({fields, className, columnWidth, toggleSelectAll, selectAll, columns}: HeaderProps) => {
    return (
        <div className={className}>
        {
            columns.map((column, index) => {
                switch (column.type) {

                    case 'SELECT':
                        return (
                            <HeaderCell width={columnWidth(index)}>
                                <CheckBox checked={selectAll} onChange={() => toggleSelectAll()} />
                            </HeaderCell>
                        );
                    break;
                    case 'TOOLBAR':
                        return <HeaderCell width={columnWidth(index)} key={index}>&nbsp;</HeaderCell>;
                    break;
                    case 'DATA':
                    default:
                        const field = fields.find( (f) => f.name === column.fieldName);
                        if (field) {
                            return <HeaderCell width={columnWidth(index)} key={index}>{field.display}</HeaderCell>;
                        }

                    break;
                }

                return <HeaderCell width={columnWidth(index)} key={index}>&nbsp;</HeaderCell>;

            })
        }
        </div>
    );

};

const StyledHeader = styled(Header)`
    display: flex;
`;

const DataTableVirtualized = ({data, fields, className, columns, rowToolBar}: DataTableVirtualizedProps) => {

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

    const itemData = {
        rows: data,
        fields,
        setSelectedItems,
        toggleSelectAll,
        selected,
        columns,
        rowToolBar
    };

    return (
        <div className={className}>
            <StyledHeader
                toggleSelectAll={toggleSelectAll}
                selectAll={selectAll}
                fields={fields}
                columnWidth={(index) => 800 / columns.length}
                columns={columns}
            />
            <Grid
                columnWidth={(index) => 800 / columns.length}
                columnCount={columns.length}
                rowHeight={() => 50}
                rowCount={data.length}
                itemData={itemData}
                width={800}
                height={600}
            >
            {StyledCell}
            </Grid>
        </div>
    );

};

export default styled(DataTableVirtualized)`
    font-family: ${({ theme: { fontFamily } }) => fontFamily};
    font-size: 12px;
`;
