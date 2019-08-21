import { storiesOf } from '@storybook/react';
import React from 'react';

// import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import faker from 'faker/locale/nl';
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

const rowToolBar = (row: DataRow) => (
    <ButtonGroup size={'s'}>
        <RowAction onClick={() => console.log('Edit', row)}><Edit /></RowAction>
        <RowAction onClick={() => console.log('Delete', row)}><Trash /></RowAction>
        <RowAction><Options /></RowAction>
    </ButtonGroup>
);

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
        <DataTableVirtualized data={data} fields={fields}  />
    ))
  .add('DataTable', () => (
      <DataTable data={data} selectable={true} rowToolBar={rowToolBar} fields={fields}  />
  ));
