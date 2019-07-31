import * as React from 'react';
import styled from 'styled-components';

import CheckBox from '../Input/Checkbox/Checkbox';
import HeaderCell from './DataTableHeaderCell';

interface HeaderProps {
    children: JSX.Element | JSX.Element[];
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

const DataTableHeader = () => {
    return (
        <Header>
            <HeaderCell><CheckBox /></HeaderCell>
            <HeaderCell width={200}>Header #1</HeaderCell>
            <HeaderCell>Header #2</HeaderCell>
            <HeaderCell>Header #3</HeaderCell>
        </Header>
    );
};

export default DataTableHeader;
