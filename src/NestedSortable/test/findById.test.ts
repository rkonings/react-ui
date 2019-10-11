import { findById } from './../helpers';
import { ItemTypes } from './../NestedSortable';
describe('findById', () => {
    test('find item FOO', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'DOO',
                id: 'DOO',
            },
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            }
        ];
        const result = findById(data, 'FOO');

        expect(result).toEqual({
            type: ItemTypes.ITEM,
            name: 'FOO',
            id: 'FOO',
        });
    });

    test('find sub sub item BAZZFOODOO', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'DOO',
                id: 'DOO',
            },
            {
                type: ItemTypes.GROUP,
                items: [
                    {
                        type: ItemTypes.GROUP,
                        id: 'BAZZFOO',
                        items: [
                            {
                                type: ItemTypes.ITEM,
                                id: 'BAZZFOODOO',
                                name: 'BAZZFOODOO'
                            }
                        ]

                    }
                ],
                id: 'BAZZ'
            },
            {
                type: ItemTypes.ITEM,
                name: 'FOO',
                id: 'FOO',
            }
        ];
        const result = findById(data, 'BAZZFOODOO');

        expect(result).toEqual({
            type: ItemTypes.ITEM,
            id: 'BAZZFOODOO',
            name: 'BAZZFOODOO'
        });
    });
});
