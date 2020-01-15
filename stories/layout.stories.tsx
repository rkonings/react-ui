import { storiesOf } from '@storybook/react';
import arraySort from 'array-sort';
import faker from 'faker/locale/nl';
import React from 'react';
import useDimensions from 'react-use-dimensions';
import styled from 'styled-components';
import { Basic } from '../src/Layout';

import ButtonGroup from '../src/ButtonGroup/ButtonGroup';
import { DataTable } from '../src/DataTable';
import RowAction from '../src/DataTable/DataTableRowAction';
import { Edit, Options, Trash } from '../src/Icon';

import Button from '../src/Button/Button';
import { getDefaultSort, Sort } from '../src/DataTable/DataTable';
import {
    Agenda,
    Clients,
    Home,
    Inbox,
    Invoices,
    ProjectManagement,
    TimeManagement,
} from '../src/Icon';
import { DataField, DataRow } from '../src/interfaces/Data';
import { Navigation, NavigationItem } from '../src/Navigation';

const defaultData: DataRow[] = [];
for (let i = 0; i < 100; i++) {
    const row: DataRow = {
        data: {
            company: faker.company.companyName(),
            phone: faker.phone.phoneNumber(),
            last_seen: faker.date
                .between('2015-01-01', '2018-12-31')
                .toDateString(),
        },
    };
    defaultData.push(row);
}

const fields: DataField[] = [
    {
        type: 'string',
        name: 'company',
        hasNegative: false,
        isDateTime: false,
        display: 'Company',
    },
    {
        type: 'string',
        name: 'phone',
        hasNegative: false,
        isDateTime: false,
        display: 'Telephone',
    },
    {
        type: 'string',
        name: 'last_seen',
        hasNegative: false,
        isDateTime: true,
        display: 'Last seen',
    },
];

const columns = [
    {
        type: 'SELECT',
        width: 50,
    },
    {
        type: 'DATA',
        fieldName: 'company',
        sortable: true,
        defaultSort: true,
        defaultSortDirection: 'ASC',
    },
    {
        type: 'DATA',
        fieldName: 'phone',
        width: 150,
        align: 'right',
        sortable: true,
    },
    {
        type: 'DATA',
        fieldName: 'last_seen',
        width: 150,
        align: 'right',
        sortable: true,
    },
    {
        type: 'TOOLBAR',
        width: 110,
        toolbar: (row: DataRow) => (
            <ButtonGroup size={'s'}>
                <RowAction onClick={() => console.log('Edit', row)}>
                    <Edit />
                </RowAction>
                <RowAction onClick={() => console.log('Delete', row)}>
                    <Trash />
                </RowAction>
                <RowAction>
                    <Options />
                </RowAction>
            </ButtonGroup>
        ),
    },
];

const sortData = (data: DataRow[], sort: Sort) => {
    const reverse = sort.direction === 'DESC' ? { reverse: true } : undefined;
    return arraySort(data, `data.${sort.field.name}`, reverse);
};

const Card = styled.div`
    display: block;
    background: #ffffff;
    width: 98%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
`;

const DataTableWithSort = () => {
    const defaultSort = getDefaultSort(columns, fields);
    const sortedData = sortData(defaultData, defaultSort);

    const [data, setData] = React.useState<DataRow[]>(sortedData);

    const sortHandler = (sort: Sort) => {
        const sortedData = sortData(data, sort);
        setData(sortedData);
    };

    const [ref, props] = useDimensions();

    return (
        <Card ref={ref}>
            {props.width > 200 && (
                <DataTable
                    columns={columns}
                    data={data}
                    sortHandler={sortHandler}
                    fields={fields}
                    width={props.width}
                    height={props.height - 48}
                />
            )}
        </Card>
    );
};

storiesOf('Layout', module).add('Basic', () => {
    const left = (
        <Navigation>
            <NavigationItem icon={<Home />}>Dashboard</NavigationItem>
            <NavigationItem icon={<Inbox />}>Inbox</NavigationItem>
            <NavigationItem icon={<Clients />}>Clients</NavigationItem>
            <NavigationItem isActive={true} icon={<Agenda />}>
                Agenda
            </NavigationItem>
            <NavigationItem icon={<ProjectManagement />}>
                Project management
            </NavigationItem>
            <NavigationItem icon={<Invoices />}>Invoices</NavigationItem>
            <NavigationItem icon={<TimeManagement />}>
                Time management
            </NavigationItem>
        </Navigation>
    );

    const toolbar = (
        <React.Fragment>
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
        </React.Fragment>
    );

    return (
        <Basic pageTitle="Client management" left={left} toolbar={toolbar}>
            <DataTableWithSort />
        </Basic>
    );
});
