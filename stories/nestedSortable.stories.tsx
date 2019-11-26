import { storiesOf } from '@storybook/react';
import faker from 'faker';
import * as React from 'react';
import GroupExample, { Data } from '../src/NestedSortable/NestedSortable';
import { ItemTypes } from '../src/NestedSortable/NestedSortable';
import { GroupData } from '../src/NestedSortable/SortableGroup';

storiesOf('Nested sortable', module)
.add('Only Items', () => {

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
        {
            type: ItemTypes.ITEM,
            name: 'FOOBAZZ',
            id: 'FOOBAZZ',
        }
    ];

    return (
        <GroupExample data={data} />
    );
})
.add('stress test', () => {

    const createItem = () => {
        return {
            id: faker.random.uuid(),
            type: ItemTypes.ITEM,
            name: faker.random.uuid()
        };
    };

    const createItems = (amount: number): Data  => {
        const items = [];

        for (let i = 0; i < amount; i++) {
            items.push(createItem());
        }

        return items;

    };

    const createGroup = (): GroupData => {
        return {
            id: faker.random.uuid(),
            type: ItemTypes.GROUP,
            items: createItems(20)
        };
    };

    const data = [
        createGroup(),
        createGroup(),
    ];

    return (
        <GroupExample data={data} />
    );
})

.add('with group', () => {
    const data = [
        {
            type: ItemTypes.ITEM,
            name: 'BAZZ',
            id: 'BAZZ',
        },
        {
            type: ItemTypes.GROUP,
            id: 'GROUP_FOO',
            items: [
                {
                    type: ItemTypes.ITEM,
                    name: 'DOO',
                    id: 'DOO',
                }
            ]
        },
        {
            type: ItemTypes.ITEM,
            name: 'JOHN',
            id: 'JOHN',
        }
    ];

    return (
        <GroupExample data={data} />
    );
})

.add('with empty group', () => {
    const data = [
        {
            type: ItemTypes.ITEM,
            name: 'BAZZ',
            id: 'BAZZ',
        },
        {
            type: ItemTypes.GROUP,
            id: 'GROUP_FOO',
            items: []
        },
        {
            type: ItemTypes.ITEM,
            name: 'JOHN',
            id: 'JOHN',
        }
    ];

    return (
        <GroupExample data={data} />
    );
})

.add('with sub group', () => {
    const data = [
        {
            type: ItemTypes.ITEM,
            name: 'BAZZ',
            id: 'BAZZ',
        },
        {
            type: ItemTypes.GROUP,
            id: 'GROUP_FOO',
            items: [
                {
                    type: ItemTypes.ITEM,
                    name: 'DOO',
                    id: 'DOO',
                },
                {
                    type: ItemTypes.GROUP,
                    id: 'SUB_GROUP_FOO',
                    items: [
                        {
                            type: ItemTypes.ITEM,
                            name: 'SUB_DOO',
                            id: 'SUB_DOO',
                        }
                    ]
                },
            ]
        },
        {
            type: ItemTypes.ITEM,
            name: 'JOHN',
            id: 'JOHN',
        }
    ];

    return (
        <GroupExample data={data} />
    );
})

.add('with sub sub group', () => {
    const data = [
        {
            type: ItemTypes.ITEM,
            name: 'BAZZ',
            id: 'BAZZ',
        },
        {
            type: ItemTypes.GROUP,
            id: 'GROUP_FOO',
            items: [
                {
                    type: ItemTypes.ITEM,
                    name: 'DOO',
                    id: 'DOO',
                },
                {
                    type: ItemTypes.GROUP,
                    id: 'SUB_GROUP_FOO',
                    items: [
                        {
                            type: ItemTypes.ITEM,
                            name: 'SUB_DOO',
                            id: 'SUB_DOO',
                        }
                        , {
                            type: ItemTypes.GROUP,
                            id: 'SUB_SUB_FOO',
                            items: [
                                {
                                    type: ItemTypes.ITEM,
                                    id: 'FOOBAZZDOO',
                                    name: 'FOOBAZZDOO'
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            type: ItemTypes.ITEM,
            name: 'JOHN',
            id: 'JOHN',
        }
    ];

    return (
        <GroupExample data={data} />
    );
});
