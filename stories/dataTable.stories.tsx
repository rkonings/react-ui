import { storiesOf } from '@storybook/react';
import arraySort from 'array-sort';
import faker from 'faker/locale/nl';
import React from 'react';

import ButtonGroup from '../src/ButtonGroup/ButtonGroup';
import { DataTable } from '../src/DataTable';
import RowAction from '../src/DataTable/DataTableRowAction';
import { Edit, Options, Trash } from '../src/Icon';

import { getDefaultSort, Sort } from '../src/DataTable/DataTable';
import { DataField, DataRow } from '../src/interfaces/Data';

const defaultData: DataRow[] = [];
for (let i = 0; i < 100; i++) {
    const row: DataRow = {
        data:
            {
                company: faker.company.companyName(),
                phone: faker.phone.phoneNumber(),
                last_seen: faker.date.between('2015-01-01', '2018-12-31').toDateString()
            }

    };
    defaultData.push(row);
}

const fields: DataField[] = [
    {
        type: 'string',
        name: 'company',
        hasNegative: false,
        isDateTime: false,
        display: 'Company'
    },
    {
        type: 'string',
        name: 'phone',
        hasNegative: false,
        isDateTime: false,
        display: 'Telephone'
    },
    {
        type: 'string',
        name: 'last_seen',
        hasNegative: false,
        isDateTime: true,
        display: 'Last seen'
    }
];

const columns = [
    {
        type: 'SELECT',
        width: 50
    },
    {
        type: 'DATA',
        fieldName: 'company',
        width: 300,
        sortable: true,
    },
    {
        type: 'DATA',
        fieldName: 'phone',
        width: 150,
        align: 'right',
        sortable: true
    },
    {
        type: 'DATA',
        fieldName: 'last_seen',
        width: 150,
        align: 'right',
        sortable: true,
        defaultSort: true,
        defaultSortDirection: 'ASC'
    },
    {
        type: 'TOOLBAR',
        width: 110,
        toolbar: (row: DataRow) => (
            <ButtonGroup size={'s'}>
                <RowAction onClick={() => console.log('Edit', row)}><Edit /></RowAction>
                <RowAction onClick={() => console.log('Delete', row)}><Trash /></RowAction>
                <RowAction><Options /></RowAction>
            </ButtonGroup>
        )
    }
];

const sortData = (data: DataRow[], sort: Sort) => {
    const reverse = (sort.direction === 'DESC') ? {reverse: true} : null;
    return arraySort(data, `data.${sort.field.name}`, reverse);
};

const DataTableWithSort = () => {
    const defaultSort = getDefaultSort(columns, fields);
    const sortedData = sortData(defaultData, defaultSort);

    const [data, setData] = React.useState<DataRow[]>(sortedData);

    const sortHandler = (sort: Sort) => {
        const sortedData = sortData(data, sort);
        setData(sortedData);
    };

    return (
        <DataTable columns={columns} data={data} sortHandler={sortHandler} fields={fields}  />
    );
};

storiesOf('DataTable', module)
    .add('DataTable with sort', () => (
        <DataTableWithSort   />
    ));
