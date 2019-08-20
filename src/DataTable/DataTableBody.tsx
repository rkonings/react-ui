import * as React from 'react';
import styled from 'styled-components';

import CheckBox from '../Input/Checkbox/Checkbox';
import { Data, DataField, DataRow } from '../interfaces/Data';
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

interface DataTableBody {
    data: DataRow[];
    fields: DataField[];
    selectable?: boolean;
    selected?: Set<Data>;
    selectAll?: boolean;
    setSelected(item: Data): void;
    rowToolBar?(row: DataRow): JSX.Element;
}

const DataTableBody = ({data, fields, rowToolBar, selectable, setSelected, selected, selectAll}: DataTableBody) => {
    console.log(selected);
    return (
        <Body>
            {data.map((row, index) => (
                <Row key={index}>
                    {
                        selectable &&
                        <Cell>
                            <CheckBox
                                checked={selectAll || selected && selected.has(row.data)}
                                onChange={() => setSelected(row.data)}
                                type={'primary'}
                            />
                        </Cell>
                    }
                    {
                        fields.map((field, fieldIndex) => (
                            <Cell key={fieldIndex}>{row.data[field.name]}</Cell>
                        ))
                    }
                    <Cell>{rowToolBar && rowToolBar(row)}</Cell>
                </Row>
            ))}
        </Body>
    );
};

export default DataTableBody;
