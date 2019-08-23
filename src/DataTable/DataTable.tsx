import memoize from 'memoize-one';
import * as React from 'react';
import { memo, useState } from 'react';
import { areEqual, VariableSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';
import CheckBox from '../Input/Checkbox/Checkbox';
import { Data, DataField, DataRow } from '../interfaces/Data';

const CellAlignment = (align: string = 'left') => {
    if (align === 'center') {
        return `justify-content: center;`;
    } else if (align === 'right') {
        return `justify-content: flex-end;`;
    } else {
        return 'justify-content: flex-start';
    }
};

interface Column {
    type: string;
    fieldName?: string;
    width?: string | number;
    align?: string;
    toolbar?(row: DataRow): JSX.Element;
}

interface DataTableProps {
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

const Cell = memo(({ data, rowIndex, columnIndex, style, className }: CellProps) => {
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
}, areEqual);

const StyledCell = styled(Cell)<CellProps>`
    display: flex;
    align-items: center;
    ${({rowIndex}) => rowIndex % 2 ? `background: #fbf9f9;` : `` }
    box-sizing: border-box;
    padding: 0 2em;
    ${({data, columnIndex}) => {
        const column = data.columns[columnIndex];
       return CellAlignment(column.align);
    }};
`;

interface HeaderCellProps {
    width: number;
    align?: string;
}

const HeaderCell = styled.div<HeaderCellProps>`
    width: ${({width}) => width}px;
    ${({align = 'left'}) => CellAlignment(align)};
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 2em;
    height: 50px;
    font-weight: bold;
    font-size: 1.1em;
    background: #f7f7f7;
`;

interface HeaderProps {
    className?: string;
    fields: DataField[];
    selectAll: boolean;
    columns: Column[];
    toggleSelectAll(): void;
    columnWidth(index: number): number;
}

const Header = ({fields, className, columnWidth, toggleSelectAll, selectAll, columns}: HeaderProps) => {
    return (
        <div className={className}>
        {
            columns.map((column, index) => {
                switch (column.type) {

                    case 'SELECT':
                        return (
                            <HeaderCell align={column.align} key={index} width={columnWidth(index)}>
                                <CheckBox checked={selectAll} onChange={() => toggleSelectAll()} />
                            </HeaderCell>
                        );
                    break;
                    case 'TOOLBAR':
                        return (
                            <HeaderCell
                                align={column.align}
                                width={columnWidth(index)}
                                key={index}
                            >&nbsp;
                            </HeaderCell>
                        );
                    break;
                    case 'DATA':
                    default:
                        const field = fields.find( (f) => f.name === column.fieldName);
                        if (field) {
                            return (
                                <HeaderCell
                                    align={column.align}
                                    width={columnWidth(index)}
                                    key={index}
                                >{field.display}
                                </HeaderCell>
                            );
                        }

                    break;
                }

                return <HeaderCell align={column.align} width={columnWidth(index)} key={index}>&nbsp;</HeaderCell>;

            })
        }
        </div>
    );

};

const StyledHeader = styled(Header)`
    display: flex;
`;

const getColumnWidthByType = (column: Column): number => {
    if (column.type === 'SELECT') {
        return 50;
    }

    const width = column.width;
    if (typeof width === 'undefined') {
        return 100;
    } else if (typeof width === 'string') {
        return Number(width);
    }

    return width;
};

const DataTable = ({data, fields, className, columns}: DataTableProps) => {

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

    const getColumnWidth = memoize((index: number): number => {
        const column = columns[index];
        return getColumnWidthByType(column);
    });

    const getTableWidth = memoize((columns: Column[]) => {
        let width = 0;
        columns.forEach((column) => {
            width = width + getColumnWidthByType(column);
        });
        return width;
    });

    const itemData = {
        rows: data,
        fields,
        setSelectedItems,
        toggleSelectAll,
        selected,
        columns,
    };

    return (
        <div className={className}>
            <StyledHeader
                toggleSelectAll={toggleSelectAll}
                selectAll={selectAll}
                fields={fields}
                columnWidth={(index) => getColumnWidth(index)}
                columns={columns}
            />
            <Grid
                columnWidth={(index) => getColumnWidth(index)}
                overscanRowCount={20}
                columnCount={columns.length}
                rowHeight={() => 40}
                rowCount={data.length}
                itemData={itemData}
                width={getTableWidth(columns)}
                height={600}
                overscanCount={10}
            >
            {StyledCell}
            </Grid>
        </div>
    );

};

export default styled(DataTable)`
    font-family: ${({ theme: { fontFamily } }) => fontFamily};
    font-size: 12px;
`;
