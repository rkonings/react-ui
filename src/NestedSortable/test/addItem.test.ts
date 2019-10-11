import { addItem } from './../helpers';
import { Data, ItemTypes } from './../NestedSortable';
import { GroupData } from './../SortableGroup';
describe('addItem', () => {
    test('add item', () => {
        const data: Data = [];
        const item = {
            type: ItemTypes.ITEM,
            id: 'FOO',
            name: 'FOO'
        };
        const result = addItem(data, item);
        expect(result[0].id).toBe('FOO');

    });

    test('add item in group BAZZ', () => {
        const data: Data = [
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: []
            }
        ];
        const item = {
            type: ItemTypes.ITEM,
            id: 'FOO',
            name: 'FOO'
        };
        const result = addItem(data, item, 'BAZZ');
        expect((result[0] as GroupData).items[0].id).toBe('FOO');

    });

    test('add item in sub group FOOBAZZ', () => {
        const data: Data = [
            {
                type: ItemTypes.GROUP,
                id: 'BAZZ',
                items: [{
                    type: ItemTypes.GROUP,
                    id: 'FOOBAZZ',
                    items: []
                }]
            }
        ];
        const item = {
            type: ItemTypes.ITEM,
            id: 'FOO',
            name: 'FOO'
        };
        const result = addItem(data, item, 'FOOBAZZ');

        const group = result[0] as GroupData;
        const subGroup = group.items[0] as GroupData;
        expect(subGroup.items[0].id).toBe('FOO');

    });
});
