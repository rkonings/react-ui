import { XYCoord } from 'dnd-core';
import * as React from 'react';
import { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

import styled from 'styled-components';

import { GripHorizontal } from '../Icon/' ;
import { Data, ItemTypes } from './GroupExample';
import { DESTINATION } from './helpers';
import SortableItem, { ItemData } from './SortableItem';
export interface Group {
    id: string;
    items: Data;
    sortItems: (dragId: string, destinationId: string, mode: DESTINATION) => void;
}

export interface GroupData {
    id: string;
    items: Data;
    type: string;
}

interface GroupProps {
    isDragging?: boolean;
    isOver?: boolean;
    isOverCurrent?: boolean;
}

const Group = styled.div<GroupProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    background: #fff;
`;

const Handle = styled.div`
    margin-right: 10px;
    margin-left: 10px;
`;

const DragPlaceHolder = styled.div`
    height: 100px;
    width: 100%;
    background: ${({theme: { color }}) => color.gray20 };
`;

const ElementsWrapper = styled.div`
    min-height: 60px;
    padding: 10px 0px 20px 30px;
`;

const SortableGroup = ({items, id, sortItems}: Group  ): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const [{isOver, isOverCurrent}, drop] = useDrop({
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
          }),
        accept: [ItemTypes.ITEM, ItemTypes.GROUP],
        hover(dragItem: ItemData | GroupData, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }

            // Don't replace items with themselves
            if (dragItem.id === id) {
                return;
            }

            if (!monitor.isOver({shallow: true})) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current!.getBoundingClientRect();

            // Get vertical middle
            const hoverTopY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;

            const hoverBottomY =  (hoverBoundingRect.bottom - hoverBoundingRect.top) - hoverTopY;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (hoverTopY > hoverClientY) {
                sortItems(dragItem.id, id, 'BEFORE');
            } else if (hoverBottomY < hoverClientY) {
                sortItems(dragItem.id, id, 'AFTER');
            } else if (items.length === 0) {
                sortItems(dragItem.id, id, 'IN');
            }
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.GROUP, id, items },
        isDragging: (monitor) => {
            return id === monitor.getItem().id;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    preview(drop(ref));

    return (
        <Group isOver={isOver} isOverCurrent={isOverCurrent} ref={ref}>
            {isDragging && <DragPlaceHolder />}
            {!isDragging && (
                <React.Fragment>
                    <Handle ref={drag}>
                        <GripHorizontal />
                    </Handle>
                    <ElementsWrapper>
                        {items.length > 0 && items.map((item) => {

                            if (item && 'items' in item) {
                                return (
                                    <SortableGroup
                                        id={item.id}
                                        key={item.id}
                                        items={item.items}
                                        sortItems={sortItems}
                                    />
                                );
                            } else {
                                return (
                                    <SortableItem
                                        id={item.id}
                                        name={item.name}
                                        key={item.id}
                                        sortItems={sortItems}
                                    />
                                );
                            }

                        })}
                    </ElementsWrapper>
                </React.Fragment>
            )}
        </Group>
    );
};

export default SortableGroup;
