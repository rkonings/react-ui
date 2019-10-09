import 'jest-styled-components';
import { findItemsByPath } from './helpers';
import { ItemTypes } from './Sortable';
// import * as React from 'react';

const data = [
    {
        type: ItemTypes.GROUP,
        id: 'group-1',
        items: [
            {
                type: ItemTypes.ITEM,
                name: 'Item 1 -1',
                id: 'item-1-1',
            },
            {
                type: ItemTypes.ITEM,
                name: 'Item 1- 2',
                id: 'item-1-2',
            },
            {
                type: ItemTypes.ITEM,
                name: 'Item 1- 3',
                id: 'item-1-3',
            }
        ]
    },
    {
        type: ItemTypes.ITEM,
        name: 'Item 1',
        id: 'item-1',
    },
    {
        type: ItemTypes.ITEM,
        name: 'Item 2',
        id: 'item-2',
    },
    {
        type: ItemTypes.ITEM,
        name: 'Item 3',
        id: 'item-3',
    },
    {
        type: ItemTypes.GROUP,
        id: 'group-4',
        items: [
            {
                type: ItemTypes.ITEM,
                name: 'Item 4 -1',
                id: 'item-4-1',
            },
            {
                type: ItemTypes.ITEM,
                name: 'Item 4- 2',
                id: 'item-4-2',
            },
            {
                type: ItemTypes.ITEM,
                name: 'Item 4- 3',
                id: 'item-4-3',
            }
        ]
    },
    {
        type: ItemTypes.ITEM,
        name: 'Item 5',
        id: 'item-5',
    }
];

describe('findItemsByPath', () => {
    test('return items', () => {
        const items = findItemsByPath([...data], [1]);
        expect(items).not.toBe(null);
        expect(items![1]).toEqual(data[1]);
    });

    test('return items of item at path 0', () => {
        const items = findItemsByPath([...data], [0]);
        expect(items).not.toBe(null);
        expect(items![0].id).toEqual('item-1-1');
    });

    test('return items of item at path 0, 1', () => {
        const items = findItemsByPath([...data], [0, 2]);
        expect(items).not.toBe(null);
        expect(items![0].id).toEqual('item-1-1');
    });

});
