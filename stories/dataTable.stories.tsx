import { storiesOf } from '@storybook/react';
import faker from 'faker/locale/nl';
import React from 'react';

import ButtonGroup from '../src/ButtonGroup/ButtonGroup';
import DataTable from '../src/DataTable/DataTable';
import RowAction from '../src/DataTable/DataTableRowAction';
import DataTableVirtualized from '../src/DataTable/DataTableVirtualized';
import { Edit, Options, Trash } from '../src/Icon';

import { DataField, DataRow } from '../src/interfaces/Data';

const data: DataRow[] = [];
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
    },
    {
        type: 'DATA',
        fieldName: 'company'
    },
    {
        type: 'DATA',
        fieldName: 'phone'
    },
    {
        type: 'DATA',
        fieldName: 'last_seen'
    },
    {
        type: 'TOOLBAR',
        toolbar: (row: DataRow) => (
            <ButtonGroup size={'s'}>
                <RowAction onClick={() => console.log('Edit', row)}><Edit /></RowAction>
                <RowAction onClick={() => console.log('Delete', row)}><Trash /></RowAction>
                <RowAction><Options /></RowAction>
            </ButtonGroup>
        )
    }
];

for (let i = 0; i < 100; i++) {
    const row: DataRow = {
        data:
            {
                company: faker.company.companyName(),
                phone: faker.phone.phoneNumber(),
                last_seen: faker.date.between('2015-01-01', '2018-12-31').toDateString()
            }

    };
    data.push(row);
}

storiesOf('DataTable', module)
    .add('DataTableVirtualized', () => (
        <DataTableVirtualized columns={columns} data={data} fields={fields}  />
    ))
  .add('DataTable', () => (
      <DataTable data={data} selectable={true} fields={fields} />
  ));
