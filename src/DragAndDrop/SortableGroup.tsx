import { XYCoord } from 'dnd-core';
import * as React from 'react';
import { useRef } from 'react';
import { DragElementWrapper, DragSourceOptions, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

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
    cursor: move;

    svg {
        fill: ${({theme: { color }}) => color.gray80 }
    }
`;

const DragPlaceHolder = styled.div`
    height: 100px;
    width: 100%;
    background: ${({theme: { color }}) => color.gray20 };
`;

const ElementsWrapper = styled.div`
    min-height: 60px;
    padding: 10px 0px 20px 30px;
    margin-left:20px;
    border-left: 1px solid ${({theme: { color }}) => color.gray20 };
`;

interface GroupHeader {
    className?: string;
    dragRef: DragElementWrapper<DragSourceOptions>;
}

const GroupHeader = styled(({className, dragRef}: GroupHeader) => {
    return (
        <div className={className}>
            <Handle ref={dragRef}>
                <GripHorizontal />
            </Handle>
            <div>All of the following rules</div>
        </div>
    );
})`
    ${({theme: { color }}) => `
        background: ${color.gray10};
        border: 1px solid ${color.gray20};
        display: flex;
        height: 40px;
        align-items: center;
        font-size: 12px;
    `};
`;

interface GroupFooter {
    className?: string;
}

const GroupFooter = styled(({className}: GroupFooter) => {
    return (
        <div className={className}>
            add a new rule or group
        </div>
    );
})`
    font-size: 12px;
    margin-left:20px;
    position: relative;
    padding-left: 30px;
    height: 40px;
    display:flex;
    margin-top: -20px;
    align-items: center;
    color: ${({theme: { color }}) => color.gray60};

    &::before {
        content: " ";
        display:block;
        position: absolute;
        width: 25px;
        left: 0px;
        height: 1px;
        background: ${({theme: { color }}) => color.gray30};
    }
`;

const InnerGroup = styled.div`
    margin-bottom: 20px;
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
                <InnerGroup>
                   <GroupHeader dragRef={drag} />
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
                    <GroupFooter />
                </InnerGroup>
            )}
        </Group>
    );
};

export default SortableGroup;
