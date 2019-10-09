import * as React from 'react';
import styled from 'styled-components';

import { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
    ConnectDragSource,
    ConnectDropTarget,
    DragSourceMonitor,
    DropTargetMonitor,
} from 'react-dnd';
import {
    DragSource,
    DragSourceConnector,
    DropTarget,
    DropTargetConnector,
  } from 'react-dnd';

const ItemTypes = {
    CARD: 'card',
    GROUP: 'group'
};

export interface Item {
    id: number;
    text: string;
}

export interface ContainerState {
    cards: Item[];
}

export interface Card {
    className?: string;
    id: number;
    text: string;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;

    isDragging: boolean;
    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
}

  interface CardInstance {
    getNode(): HTMLDivElement | null;
  }

  const Group = styled(React.forwardRef<HTMLDivElement, Card>(
    ({ text, connectDragSource, connectDropTarget, className }, ref) => {
      const elementRef = React.useRef(null);
      connectDragSource(elementRef);
      connectDropTarget(elementRef);

      React.useImperativeHandle<{}, CardInstance>(ref, () => ({
        getNode: () => elementRef.current,
      }));

      return (
        <div ref={elementRef} className={className}>
          {text}
        </div>
      );
    }
  ))`
        background: ${({theme: { color }}) => color.gray20};
        margin: 40px;

        ${({isDragging}) => isDragging ? 'opacity: 0;' : null }
  `;

const Card = styled(React.forwardRef<HTMLDivElement, Card>(
    ({ text, connectDragSource, connectDropTarget, className }, ref) => {
      const elementRef = React.useRef(null);
      connectDragSource(elementRef);
      connectDropTarget(elementRef);

      React.useImperativeHandle<{}, CardInstance>(ref, () => ({
        getNode: () => elementRef.current,
      }));

      return (
        <div ref={elementRef} className={className}>
          {text}
        </div>
      );
    }
  ))`
        background: ${({theme: { color }}) => color.gray50};
        margin: 10px;

        ${({isDragging}) => isDragging ? 'opacity: 0;' : null }
  `;

const SortableCard = DropTarget(
    ItemTypes.CARD,
    {
      hover(
        props: Card,
        monitor: DropTargetMonitor,
        component: CardInstance,
      ) {
        if (!component) {
          return null;
        }
        // node = HTML Div element from imperative API
        const node = component.getNode();
        if (!node) {
          return null;
        }

        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = node.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;

        return;
      },
    },
    (connect: DropTargetConnector) => ({
      connectDropTarget: connect.dropTarget(),
    }),
  )(
    DragSource(
      ItemTypes.CARD,
      {
        beginDrag: (props: Card) => ({
          id: props.id,
          index: props.index,
        }),
      },
      (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
      }),
    )(Card),
  );

  const SortableGroup = DropTarget(
    ItemTypes.GROUP,
    {
      hover(
        props: Card,
        monitor: DropTargetMonitor,
        component: CardInstance,
      ) {
        if (!component) {
          return null;
        }
        // node = HTML Div element from imperative API
        const node = component.getNode();
        if (!node) {
          return null;
        }

        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = node.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;

        return;
      },
    },
    (connect: DropTargetConnector) => ({
      connectDropTarget: connect.dropTarget(),
    }),
  )(
    DragSource(
      ItemTypes.CARD,
      {
        beginDrag: (props: Card) => ({
          id: props.id,
          index: props.index,
        }),
      },
      (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
      }),
    )(Group),
  );

const List = styled.div`
    padding: 1em;
    background: ${({theme: { color }}) => color.gray20};
`;
const Item = styled.div`
    padding: 1em;
    font-size: 14px;
`;

interface Sortable {
    className?: string;
}

const Sortable = styled(({className}: Sortable) => {

    const [cards, setCards] = React.useState([
        {
          id: 1,
          text: 'Write a cool JS library',
          type: ItemTypes.CARD
        },
        {
          id: 2,
          text: 'Make it generic enough',
          type: ItemTypes.CARD
        },
        {
          id: 3,
          text: 'Write README',
          type: ItemTypes.CARD
        },
        {
          id: 4,
          text: 'Create some examples',
          type: ItemTypes.CARD
        },
        {
          id: 5,
          text:
            'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            type: ItemTypes.CARD
        },
        {
          id: 6,
          text: '???',
          type: ItemTypes.GROUP
        },
        {
          id: 7,
          text: 'PROFIT',
          type: ItemTypes.GROUP
        },
    ]);

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]}));
    };

    return (
        <div className={className}>
            {cards.map((card, i) => {
                if (card.type === ItemTypes.CARD) {
                    return (
                        <SortableCard
                            key={card.id}
                            index={i}
                            id={card.id}
                            text={card.text}
                            moveCard={moveCard}
                        />
                    );
                }

                return (
                    <SortableGroup
                        key={card.id}
                        index={i}
                        id={card.id}
                        text={card.text}
                        moveCard={moveCard}
                    />
                );

            })}
      </div>
    );
})`
    background: ${({theme: { color }}) => color.gray20};
    width: 500px;
    height: 400px;
`;

export default () => {
    return (

        <DndProvider backend={HTML5Backend}>
            <Sortable />
        </DndProvider>

    );
};

// const reorder = (list: string[], startIndex: number, endIndex: number) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
//   };

// const Simple = () => {

//     const [items, setItems] = React.useState(['item-1', 'item-2', 'item-3', 'item-4']);

//     const onDragEnd = (result: DropResult) => {
//         if (!result.destination) {
//             return;
//           }

//           if (result.destination.index === result.source.index) {
//             return;
//           }

//           setItems(reorder(items, result.source.index, result.destination.index));
//     };

//     return (
//         <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable droppableId="list">
//                 {(provided) => (
//                     <div ref={provided.innerRef} {...provided.droppableProps}>
//                         <List>
//                         {items.map((item, key) => (
//                             <Draggable key={key} index={key} draggableId={item}>
//                                 {(provided) => (
//                                     <Item
//                                         key={key}
//                                         ref={provided.innerRef}
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                     >
//                                         {item}
//                                     </Item>
//                                 )}
//                             </Draggable>
//                         ))}
//                         {provided.placeholder}
//                     </List>

//                   </div>
//                 )}
//             </Droppable>
//         </DragDropContext>
//     );
// };

// export default Simple;
