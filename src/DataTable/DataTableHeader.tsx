import * as React from 'react';
import styled from 'styled-components';

import { Phone } from '../Icon/index';
import CheckBox from '../Input/Checkbox/Checkbox';
import { DataField } from '../interfaces/Data';
import HeaderCell from './DataTableHeaderCell';

interface HeaderProps {
    children: JSX.Element | JSX.Element[];
}

interface DataTableHeaderProps {
    fields: DataField[];
    selectable?: boolean;
    hasRowToolBar?: boolean;
    selectAll?: boolean;
    toggleSelectAll(): void;
}

const HeaderRow = styled.tr`
    height: 40px;
    background: #f7f7f7;
`;

const Header = ({children}: HeaderProps) => {
    return (
        <thead>
            <HeaderRow>
                {children}
            </HeaderRow>
        </thead>
    );
};

const DataTableHeader = ({fields, selectable, hasRowToolBar, toggleSelectAll, selectAll}: DataTableHeaderProps) =>  {
    return (
        <Header>
            {selectable && <HeaderCell><CheckBox checked={selectAll} onChange={toggleSelectAll} /></HeaderCell>}
            {
                fields.map((field, index) => (
                    <HeaderCell key={index}>{field.display}</HeaderCell>
                ))
            }
            {hasRowToolBar && <HeaderCell>Actions</HeaderCell>}
            {/* <HeaderCell align={'CENTER'}><CheckBox /></HeaderCell>
            <HeaderCell width={200} align={'LEFT'} sort={'ASC'}>Company name</HeaderCell>
            <HeaderCell width={120} align={'RIGHT'}>Phone<Phone spacing={'left'} /></HeaderCell>
            <HeaderCell align={'RIGHT'} width={100}>Actions</HeaderCell> */}
        </Header>
    );
};

export default DataTableHeader;
