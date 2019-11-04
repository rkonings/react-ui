import memoize from 'memoize-one';
import * as React from 'react';
import { memo, useState } from 'react';
import { areEqual, VariableSizeGrid, VariableSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import { ArrowDown, ArrowLeft, ArrowUp } from '../Icon/index';
import Sort from '../Icon/Sort';
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

export interface Sort {
    direction: string;
    field: DataField;
}

interface Column {
    type: string;
    fieldName?: string;
    width?: string | number;
    align?: string;
    sortable?: boolean;
    defaultSort?: boolean;
    defaultSortDirection?: string;
    toolbar?(row: DataRow): JSX.Element;
}

interface DataTableProps {
    className?: string;
    data: DataRow[];
    fields: DataField[];
    columns: Column[];
    width: number;
    height?: number;
    sortHandler?(sort: Sort): void;
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
    ${({rowIndex, theme: { table: { row }}}) => rowIndex % 2 ? `background: ${row.secondairyColor};` : `` }
    box-sizing: border-box;
    padding: 0 20px;
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
    padding: 0 20px;
    font-weight: bold;

    ${({theme: { table: { header } }}) => {
        return `
            background: ${header.color};
            height: ${header.height}px;
            color: ${header.text};
            font-size: ${header.fontSize};
        `;
    } };
`;

interface HeaderCellSortableProps extends HeaderCellProps {
    children: JSX.Element | string;
    className?: string;
    sortDirection?: string;
    currentSort?: boolean;
    onClick(e: React.MouseEvent): void;

}

const HeaderCellSortable = ({onClick, sortDirection, className, children, ...props}: HeaderCellSortableProps) => (

        <HeaderCell {...props}>
            <button className={className} onClick={onClick}>
                {children}
                {sortDirection === 'DESC' && <ArrowUp spacing={'left'} />}
                {sortDirection === 'ASC' && <ArrowDown spacing={'left'} />}
            </button>
        </HeaderCell>

);

const StyledHeaderCellSortable = styled(HeaderCellSortable)`
    border: none;
    border-radius: 0;
    padding: 0;
    ${({theme: { table: { header } }}) => {
        return `
            background: ${header.color};
            height: ${header.height}px;
            color: ${header.text};
            font-size: ${header.fontSize};
            font-weight: bold;
            display: flex;
            align-items: center;
        `;
    } };

    &:hover {
        ${ArrowLeft}, ${ArrowDown} {
            opacity: ${({currentSort}) => currentSort ? 1 : 0.8 };
        }
    }

    ${ArrowLeft}, ${ArrowDown} {
        animation: opacity .4s ease-in;;
        opacity: ${({currentSort}) => currentSort ? 1 : 0.1 };
    }

    &:focus {
        outline: none;
    }
`;

interface HeaderProps {
    className?: string;
    fields: DataField[];
    selectAll: boolean;
    columns: Column[];
    sort: Sort;
    toggleSelectAll(): void;
    columnWidth(index: number): number;
    setSort(sort: Sort): void;
}

const getNewSortDirection = (sort: Sort, field: DataField) => {
    const sortDirection = sort.field === field ? sort.direction : 'ASC';

    let newSortDirection;
    if (sort.field === field) {
        newSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
        newSortDirection = 'ASC';
    }

    return {field, direction: newSortDirection};
};

const Header = ({fields, sort, setSort, className, columnWidth, toggleSelectAll, selectAll, columns}: HeaderProps) => {
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
                            if (column.sortable) {
                                const sortDirection = sort.field === field ? sort.direction : 'ASC';
                                const newSort = getNewSortDirection(sort, field);
                                return (
                                    <StyledHeaderCellSortable
                                        align={column.align}
                                        width={columnWidth(index)}
                                        key={index}
                                        currentSort={sort.field === field}
                                        sortDirection={sortDirection}
                                        onClick={() => setSort(newSort)}
                                    >
                                        {field.display}
                                    </StyledHeaderCellSortable>
                                );

                            }
                            return (
                                <HeaderCell
                                    align={column.align}
                                    width={columnWidth(index)}
                                    key={index}
                                >
                                    {field.display}
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
    width: 100%;
`;

const getColumnWidthByType = (column: Column, remainingwidth?: number): number => {
    if (column.type === 'SELECT') {
        return 50;
    }

    const width = column.width;
    if (typeof width === 'undefined') {
        if (remainingwidth) {
            return remainingwidth;
        }
        return 100;
    } else if (typeof width === 'string') {
        return Number(width);
    }

    return width;
};

export const getDefaultSort = (columns: Column[], fields: DataField[]): Sort => {
    const DEFAULT_SORT: Sort = {
        direction: 'ASC',
        field: fields[0]
    };

    const column = columns.find( (column) => column.defaultSort === true);
    if (column) {
        const field = fields.find( (field) => field.name === column.fieldName);
        return {
            direction: column.defaultSortDirection || 'ASC',
            field: field || fields[0]
        };
    }

    return DEFAULT_SORT;
};

const getRemainingColumnWidth = (columns: Column[], width: number) => {
    return columns.reduce((w, col) => {
        if (col.width) {
            w = w - getColumnWidthByType(col);
        }
        return w;
    }, width);
};

const DataTable = ({data, sortHandler, fields, className, columns, width, height = 600}: DataTableProps) => {

    const [selectAll, setSelectAll] = useState(false);
    const [selected, setSelected] = useState<Set<Data>>(new Set());
    const defaultSort = getDefaultSort(columns, fields);
    const [sort, _setSort] = useState<Sort>(defaultSort);
    const ref = React.useRef<VariableSizeGrid | null | undefined>();

    const theme = useTheme();

    const setSort = (sort: Sort) => {
        _setSort(sort);
        if (sortHandler) {
            sortHandler(sort);
        }
    };

    React.useEffect(() => {
        if (ref && ref.current) {
            const index = columns.findIndex((item) => !item.width );
            if (index > 0) {
                ref.current.resetAfterColumnIndex(index);
            }
        }
    }, [width]);

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

    const getColumnWidth = (index: number): number => {
        const w = getRemainingColumnWidth(columns, width);
        const column = columns[index];
        return getColumnWidthByType(column, w);
    };

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
                sort={sort}
                setSort={setSort}
            />
            <Grid
                ref={ref}
                columnWidth={(index) => getColumnWidth(index)}
                overscanRowCount={20}
                columnCount={columns.length}
                rowHeight={() => theme.table.row.height}
                rowCount={data.length}
                itemData={itemData}
                width={width}
                height={height}
                overscanCount={10}
            >
            {StyledCell}
            </Grid>
        </div>
    );

};

export default styled(DataTable)`
    ${({ theme: { fontFamily, table: { fontSize } } }) => {
        return `
            font-family: ${fontFamily};
            font-size: ${fontSize};
        `;
    }};

`;
