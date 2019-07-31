import * as React from 'react';
import styled from 'styled-components';

import CheckBox from '../Input/Checkbox/Checkbox';
import Cell from './DataTableCell';

const Row = styled.tr``;
const Body = styled.tbody`
    ${Row} {
        transition: background-color 0.2s linear;
        &:nth-child(even) {
             background: #fbf9f9;
        }
        &:hover {
            background: #f3f0f0;
        }
    }
`;

const DataTableBody = () => {
    return (
        <Body>
            <Row>
                <Cell><CheckBox /></Cell>
                <Cell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Cell>
                <Cell>Cell #2</Cell>
                <Cell>Cell #3</Cell>
            </Row>
            <Row>
                <Cell><CheckBox /></Cell>
                <Cell>Cell #1</Cell>
                <Cell>Cell #2</Cell>
                <Cell>Cell #3</Cell>
            </Row>
            <Row>
                <Cell><CheckBox /></Cell>
                <Cell>Cell #1</Cell>
                <Cell>Cell #2</Cell>
                <Cell>Cell #3</Cell>
            </Row>
            <Row>
                <Cell><CheckBox /></Cell>
                <Cell>Cell #1</Cell>
                <Cell>Cell #2</Cell>
                <Cell>Cell #3</Cell>
            </Row>
        </Body>
    );
};

export default DataTableBody;
