import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Drag from '../src/DragAndDrop/Drag';
import GroupExample from '../src/DragAndDrop/GroupExample';
import { ItemTypes } from '../src/DragAndDrop/GroupExample';
import Simple from '../src/DragAndDrop/Simple';

storiesOf('Drag and Drop', module)
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
})
.add('simple', () => {
    return (
        <Simple />
    );
})
.add('Drag', () => {
    return (
        <Drag />
    );
});
