import { ItemTypes } from '../NestedSortable';
import { findParentByPath } from './../helpers';

describe('findParentByPath', () => {
    test('find parent of path 0', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                id: 'FOO',
                name: 'FOO',
            },
        ];

        const parent = findParentByPath(data, [0]);
        expect(parent.id).toBe('0');
    });

    test('find parent of path 0, 0', () => {
        const data = [
            {
                type: ItemTypes.GROUP,
                id: 'FOO',
                items: [
                    {
                        type: ItemTypes.ITEM,
                        id: 'BAZZ',
                        name: 'BAZZ',
                    },
                ],
            },
        ];

        const parent = findParentByPath(data, [0, 0]);
        expect(parent.id).toBe('FOO');
    });

    test('find parent of path 0, 0, 0', () => {
        const data = [
            {
                type: ItemTypes.GROUP,
                id: 'FOO',
                items: [
                    {
                        type: ItemTypes.GROUP,
                        id: 'FOOBAZZ',
                        items: [
                            {
                                type: ItemTypes.ITEM,
                                id: 'BAZZ',
                                name: 'BAZZ',
                            },
                        ],
                    },
                ],
            },
        ];

        const parent = findParentByPath(data, [0, 0, 0]);
        expect(parent.id).toBe('FOOBAZZ');
    });
});
