import { ItemTypes } from './../GroupExample';
import { findParentById } from './../helpers';
import { GroupData } from './../SortableGroup';
describe('findParentById', () => {
    test('find parent of item FOO', () => {
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
        const result = findParentById(data, 'FOO');
        expect((result as GroupData).type).toEqual(ItemTypes.GROUP);
        expect((result as GroupData).id).toEqual('0');
    });

    test('find parent of sub item FOO', () => {
        const data = [
            {
                type: ItemTypes.ITEM,
                name: 'DOO',
                id: 'DOO',
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
                    {
                        type: ItemTypes.ITEM,
                        name: 'FOO',
                        id: 'FOO',
                    }
                ]
            }
        ];
        const result = findParentById(data, 'FOO');
        expect((result as GroupData).type).toEqual(ItemTypes.GROUP);
        expect((result as GroupData).id).toEqual('BAZZ');
    });

});
