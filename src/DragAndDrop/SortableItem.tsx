import * as React from 'react';
import { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

import { XYCoord } from 'dnd-core';
import styled from 'styled-components';
import { GripHorizontal } from '../Icon/' ;
import StyledSelect from '../Input/Select/Select';
import { ItemTypes } from './GroupExample';
import { DESTINATION } from './helpers';
import { GroupData } from './SortableGroup';

export interface Item {
    name: string;
    id: string;
    sortItems: (dragId: string, destinationId: string, mode: DESTINATION) => void;
    onDragOver?(id: string): void;
}

export interface ItemData {
    id: string;
    name: string;
    type: string;
}

const DragPlaceHolder = styled.div`
    height: 60px;
    width: 100%;
    background: ${({theme: { color }}) => color.gray10 };
`;

interface ItemProps {
    isDragging: boolean;
}

const Item = styled.div<ItemProps>`
    width: 100%;
    display:flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    height: 60px;
    background: ${({theme: { color }}) => color.white};
`;

const Handle = styled.div`
    margin-right: 10px;
    margin-left: 10px;
    cursor: move;

    svg {
        fill: ${({theme: { color }}) => color.gray80 }
    }
`;

const Column = styled.div`
    padding-right: 10px;
`;

export default ({name, id, sortItems}: Item) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: [ItemTypes.ITEM, ItemTypes.GROUP],
        hover(dragItem: ItemData | GroupData, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }

            // Don't replace items with themselves
            if (dragItem.id === id) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current!.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (hoverClientY < hoverMiddleY) {
                sortItems(dragItem.id, id, 'BEFORE');
            } else if (hoverClientY > hoverMiddleY) {
                sortItems(dragItem.id, id, 'AFTER');
            }
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.ITEM, id },
        isDragging: (monitor) => {
            return id === monitor.getItem().id;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    preview(drop(ref));

    return (
        <Item isDragging={isDragging} ref={ref}>
            {isDragging && <DragPlaceHolder />}
            {!isDragging && (
                <React.Fragment>
                    <Handle ref={drag}>
                        <GripHorizontal />
                    </Handle>
                    <Column>
                        <StyledSelect options={['Pagetitle', 'URL']} size={'xs'} width="250px" />
                    </Column>
                    <Column>
                        <StyledSelect options={['=', '>']} size={'xs'} width="75px" />
                    </Column>
                </React.Fragment>
            )}
        </Item>
    );
};
