import { reorderItems } from '../helpers';
import { ItemTypes } from './../NestedSortable';
describe('reorderItems', () => {
    test('item FOO to BAZZ', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
            {
                type: ItemTypes.ITEM,
                name: 'BAZZ',
                id: 'BAZZ',
            },
        ];

        const result = reorderItems([...data], 'FOO', 'BAZZ', 'AFTER');
        expect(result[1].id).toEqual('FOO');
    });

    test('item FOO to BAZZ', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
        ];

        const result = reorderItems([...data], 'FOO', 'FOO', 'AFTER');
        expect(result[0].id).toEqual('FOO');
    });

    test('move item FOO before FOOBAZZ', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [
                    {
                        type: ItemTypes.ITEM,
                        name: 'FOOBAZZ',
                        id: 'FOOBAZZ',
                    },
                ],
            },
        ];

        const result = reorderItems([...data], 'FOO', 'FOOBAZZ', 'BEFORE');
        expect(result[0].items[0].id).toEqual('FOO');
    });

    test('move item FOO after FOOBAZZ', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [
                    {
                        type: ItemTypes.ITEM,
                        name: 'FOOBAZZ',
                        id: 'FOOBAZZ',
                    },
                ],
            },
        ];

        const result = reorderItems([...data], 'FOO', 'FOOBAZZ', 'AFTER');
        expect(result[0].items[1].id).toEqual('FOO');
    });

    test('move item FOO after last item in sub group', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [
                    {
                        type: ItemTypes.ITEM,
                        name: 'DOO',
                        id: 'DOO',
                    },
                    {
                        type: ItemTypes.ITEM,
                        name: 'FOOBAZZ',
                        id: 'FOOBAZZ',
                    },
                ],
            },
        ];

        const result = reorderItems([...data], 'FOO', 'FOOBAZZ', 'AFTER');
        expect(result[0].items[2].id).toEqual('FOO');
    });

    test('move item FOO before first item in sub group', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [
                    {
                        type: ItemTypes.ITEM,
                        name: 'DOO',
                        id: 'DOO',
                    },
                    {
                        type: ItemTypes.ITEM,
                        name: 'FOOBAZZ',
                        id: 'FOOBAZZ',
                    },
                ],
            },
        ];

        const result = reorderItems([...data], 'FOO', 'DOO', 'BEFORE');
        expect(result[0].items[0].id).toEqual('FOO');
    });

    test('move item FOO to empty sub group', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [],
            },
        ];

        const result = reorderItems([...data], 'FOO', 'BAZZ', 'IN');
        expect(result[0].items[0].id).toEqual('FOO');
    });

    test('move item FOO to after empty sub group', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [],
            },
        ];

        const result = reorderItems([...data], 'FOO', 'BAZZ', 'AFTER');
        expect(result[1].id).toEqual('FOO');
    });

    test('move item FOO to before empty sub group', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOOBAZZ',
                id: 'FOOBAZZ',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [],
            },
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
        ];

        const result = reorderItems([...data], 'FOO', 'BAZZ', 'BEFORE');
        expect(result[1].id).toEqual('FOO');
    });

    test('return false when source (FOOBAZZ) and destination (BEFORE BAZZ) have the same location', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOOBAZZ',
                id: 'FOOBAZZ',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [],
            },
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
        ];

        const result = reorderItems([...data], 'FOOBAZZ', 'BAZZ', 'BEFORE');
        expect(result).toBeFalsy();
    });

    test('return false when source (FOO) and destination (AFTER BAZZ) have the same location', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'FOOBAZZ',
                id: 'FOOBAZZ',
            },
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [],
            },
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            },
        ];

        const result = reorderItems([...data], 'FOO', 'BAZZ', 'AFTER');
        expect(result).toBeFalsy();
    });

    // test('move sub group to last position', () => {
    //     const data = [
    //         {
    //             type: ItemTypes.ITEM,
    //             name: 'FOO',
    //             id: 'FOO'
    //         },
    //         {
    //             type: ItemTypes.ITEM,
    //             name: 'LAST',
    //             id: 'LAST'
    //         },
    //         {
    //             type: ItemTypes.GROUP,
    //             id: 'BAZZ',
    //             items: [
    //                 {
    //                     type: ItemTypes.GROUP,
    //                     id: 'SUB_GROUP',
    //                     items: [
    //                         {
    //                             type: ItemTypes.ITEM,
    //                             name: 'SUB_DOO',
    //                             id: 'SUB_DOO'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     type: ItemTypes.ITEM,
    //                     name: 'FOOBAZZ',
    //                     id: 'FOOBAZZ'
    //                 },
    //             ]
    //         },
    //     ];

    //     const result = reorderItems([...data], 'BAZZ', 'LAST', 'BEFORE' );
    //     expect(result[3].id).toEqual('SUB_GROUP');
    // });
});
