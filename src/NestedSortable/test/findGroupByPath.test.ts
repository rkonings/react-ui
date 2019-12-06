import 'jest-styled-components';
import { ItemTypes } from '../NestedSortable';
import { findGroupByPath } from './../helpers';
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
                id: 'DOO',
                type: ItemTypes.GROUP,
                items: [
                    {
                        type: ItemTypes.ITEM,
                        name: 'Item 111',
                        id: 'BAZZ',
                    },
                ],
            },
            {
                type: ItemTypes.ITEM,
                name: 'Item 1- 3',
                id: 'item-1-3',
            },
        ],
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
            },
        ],
    },
    {
        type: ItemTypes.ITEM,
        name: 'Item 5',
        id: 'item-5',
    },
];

describe('findGroupByPath', () => {
    /* find top level group  */
    test('find group at path 0', () => {
        const result = findGroupByPath([...data], [0]);
        expect(result.id).toEqual('0');
    });

    /* find top level group  */
    test('find group on path 1', () => {
        const result = findGroupByPath([...data], [1]);
        expect(result.id).toEqual('0');
    });

    test('find group on path 0, 1, 0', () => {
        const result = findGroupByPath([...data], [0, 1, 0, 1]);
        expect(result.id).toEqual('DOO');
    });

    test('find group on path 0, 1, 0, 0', () => {
        const result = findGroupByPath([...data], [0, 1, 0, 1]);
        expect(result.id).toEqual('DOO');
    });
});
