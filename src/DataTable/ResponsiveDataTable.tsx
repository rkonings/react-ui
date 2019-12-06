import React from 'react';
import useDimensions from 'react-use-dimensions';
import styled from 'styled-components';
import { DataField, DataRow } from '../interfaces/Data';
import { Column, Sort } from './DataTable';
import DataTable from './DataTable';

const Card = styled.div`
    display: block;
    background: #ffffff;
    width: 98%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
`;

interface ResponsiveDataTable {
    data: DataRow[];
    fields: DataField[];
    columns: Column[];
    sortHandler?(sort: Sort): void;
}

export default ({
    data,
    fields,
    columns,
    sortHandler,
}: ResponsiveDataTable) => {
    const [ref, props] = useDimensions();

    return (
        <Card ref={ref}>
            {props.width > 200 && (
                <DataTable
                    columns={columns}
                    data={data}
                    fields={fields}
                    width={props.width}
                    sortHandler={sortHandler}
                    height={props.height - 48}
                />
            )}
        </Card>
    );
};
