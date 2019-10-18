import React from 'react';
import styled from 'styled-components';
import { ItemData } from './interfaces';
import Item from './Item';

interface Invoice {
    className?: string;
    items: ItemData[];
}

const Invoice = ({className, items}: Invoice) => {
    return (
        <div className={className}>
            {items.map((item, index) => <Item key={index} {...item} />)}
            <Item />
        </div>
    );
};

export default styled(Invoice)`
    width: 800px;
`;
