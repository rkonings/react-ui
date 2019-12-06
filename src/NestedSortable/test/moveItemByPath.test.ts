import { moveItemByPath } from './../helpers';
import { ItemTypes } from './../NestedSortable';
import { GroupData } from './../SortableGroup';

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

describe('moveItemByPath', () => {
    test('move item from 0 to 1', () => {
        const testData = [
            {
                type: ItemTypes.ITEM,
                name: 'DOO',
                id: 'DOO',
            },
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
        ];
        const result = moveItemByPath(testData, [0], [1], 'AFTER');
        expect(result[1].id).toEqual('DOO');
    });

    test('move item from 1 before 3', () => {
        const testData = [
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
                type: ItemTypes.ITEM,
                name: 'Item 4',
                id: 'item-4',
            },
        ];

        const result = moveItemByPath(testData, [1], [3], 'BEFORE');
        expect(result[0].id).toEqual('item-1');
        expect(result[1].id).toEqual('item-3');
        expect(result[2].id).toEqual('item-2');
        expect(result[3].id).toEqual('item-4');
    });

    test('move item from 3 before 0', () => {
        const testData = [
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
                type: ItemTypes.ITEM,
                name: 'Item 4',
                id: 'item-4',
            },
        ];

        const result = moveItemByPath(testData, [3], [0], 'BEFORE');
        expect(result[0].id).toEqual('item-4');
        expect(result[1].id).toEqual('item-1');
        expect(result[2].id).toEqual('item-2');
        expect(result[3].id).toEqual('item-3');
    });

    test('move item from 1 to 0', () => {
        const moved = data[1];
        const result = moveItemByPath([...data], [1], [0], 'BEFORE');
        expect(moved.id).toEqual(result[0].id);
    });

    test('move item from 0.1 to 3', () => {
        const moved = data[0].items![1];
        const result = moveItemByPath([...data], [0, 1], [3], 'BEFORE');
        expect(moved.id).toEqual(result[3].id);
    });

    test('move item from 4, 0 to 0, 0', () => {
        const moved = data[4].items![0];
        const result = moveItemByPath([...data], [4, 0], [0, 0], 'BEFORE');
        expect(moved.id).toEqual((result[0] as GroupData).items[0].id);
    });

    test('move item from 4 to 0, 0', () => {
        const moved = data[4];
        const result = moveItemByPath([...data], [4], [0, 0], 'BEFORE');
        expect(moved.id).toEqual((result[0] as GroupData).items[0].id);
    });
});
