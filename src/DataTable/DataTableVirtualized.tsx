import * as React from 'react';
import { Column, Table } from 'react-virtualized';
import styled from 'styled-components';
import { Data, DataField, DataRow } from '../interfaces/Data';

interface DataTableVirtualizedProps {
    className?: string;
    data: DataRow[];
    fields: DataField[];
}

export interface RowRendererParams {
    className: string;
    columns: JSX.Element[];
    index: number;
    key: string;
    isScrolling: boolean;
    rowData: Data;
    style: {
        [key: string]: string;
    };
}

interface RowProps {
    className?: string;
    children: JSX.Element[];
    style: {
        [key: string]: string;
    };

}

const Row = ({className, style, children}: RowProps) => {
    return (
        <div role="row" className={className} style={style}>
            {children}
        </div>
    );
};

const StyledRow = styled(Row)<RowProps>`
    display: flex;
`;

const rowRenderer = ({style, columns, key}: RowRendererParams) => {
    return (
        <StyledRow
            key={key}
            style={style}
        >
            {columns}
        </StyledRow>
    );
};

const DataTableVirtualized = ({data, fields, className}: DataTableVirtualizedProps) => {
    return (
        <Table
            className={className}
            width={900}
            height={600}
            headerHeight={20}
            rowHeight={50}
            rowRenderer={rowRenderer}
            rowCount={data.length}
            rowGetter={({ index }) => data[index].data}
        >
            {
                fields.map((field) => (
                    <Column
                        key={field.name}
                        label={field.display}
                        dataKey={field.name}
                        width={300}
                    />
                ))
            }
        </Table>
    );
};

export default styled(DataTableVirtualized)`
    font-family: ${({ theme: { fontFamily } }) => fontFamily};
    font-size: 12px;
    .ReactVirtualized__Collection {
    }

    .ReactVirtualized__Collection__innerScrollContainer {
    }

    /* Grid default theme */

    .ReactVirtualized__Grid {
    }

    .ReactVirtualized__Grid__innerScrollContainer {
    }

    .ReactVirtualized__Table {

    }

    .ReactVirtualized__Table__Grid {
    }

    .ReactVirtualized__Table__headerRow {
        font-weight: 700;
        text-transform: uppercase;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .ReactVirtualized__Table__row {
        display: flex;
        flex-direction: row;
        align-items: center;
        transition: background-color 0.2s linear;
        &:nth-child(even) {
             background: #fbf9f9;
        }
        &:hover {
            background: #f3f0f0;
        }
    }

    .ReactVirtualized__Table__headerTruncatedText {
        display: inline-block;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .ReactVirtualized__Table__headerColumn,
    .ReactVirtualized__Table__rowColumn {
        margin-right: 10px;
        min-width: 0px;
    }
    .ReactVirtualized__Table__rowColumn {
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .ReactVirtualized__Table__headerColumn:first-of-type,
    .ReactVirtualized__Table__rowColumn:first-of-type {
        margin-left: 10px;
    }
    .ReactVirtualized__Table__sortableHeaderColumn {
    cursor: pointer;
    }

    .ReactVirtualized__Table__sortableHeaderIconContainer {
        display: flex;
        align-items: center;
    }
    .ReactVirtualized__Table__sortableHeaderIcon {
        flex: 0 0 24px;
        height: 1em;
        width: 1em;
        fill: currentColor;
    }

    /* List default theme */

    .ReactVirtualized__List {
    }

`;
