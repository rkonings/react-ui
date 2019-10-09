import * as React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { DESTINATION, reorderItems } from './helpers';
import SortableGroup, { GroupData } from './SortableGroup';
import SortableItem, { ItemData } from './SortableItem';
export const ItemTypes = {
    ITEM: 'item',
    GROUP: 'group'
};

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    width: 800px;
`;

export interface DragData {
    id: string;
    name?: string;
}

export type Data = Array<ItemData | GroupData>;

interface GroupExample {
    data: Data;
}

export default ({data}: GroupExample) => {

    const [items, setItems] = React.useState<Data>(data);

    const sortItems = React.useCallback(
        (dragId: string, destinationId: string, mode: DESTINATION) => {

            const reorderedItems = reorderItems([...items], dragId, destinationId, mode );
            if (reorderedItems) {
                setItems(reorderedItems);
            }
        },
        [items],
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <Wrapper>
                {items.length > 0 && items.map((item, index) => {
                    if ('items' in item) {
                        return (
                            <SortableGroup
                                key={item.id}
                                id={item.id}
                                items={item.items}
                                sortItems={sortItems}
                            />
                        );
                    } else {
                        return (
                            <SortableItem
                                key={item.id}
                                name={item.name}
                                id={item.id}
                                sortItems={sortItems}
                            />
                        );
                    }

                } )}
            </Wrapper>
        </DndProvider>
    );
};
