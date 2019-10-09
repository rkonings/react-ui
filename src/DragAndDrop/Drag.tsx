import * as React from 'react';
import { DndProvider, DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styled from 'styled-components';

const ItemTypes = {
        BOX: 'box',
        GROUP: 'group'
};

interface Box {
    name: string;
    className?: string;
}

interface Group {
    name: string;
    className?: string;
    children: JSX.Element | JSX.Element[];
}

interface DropZone {
    className?: string;
    name: string;
    children?: JSX.Element | JSX.Element[];
}

const DropZone = styled(({className, children, name}: DropZone) => {
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: [ItemTypes.BOX, ItemTypes.GROUP],
      drop: () => ({ name }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const isActive = canDrop && isOver;
    let backgroundColor = '#FFF';
    if (isActive) {
      backgroundColor = '#CCC';
    } else if (canDrop) {
      backgroundColor = '#FFF';
    }

    return (
      <div ref={drop} className={className} style={{backgroundColor }}>
        {isActive ? 'Release to drop' : 'Drag a box here'}
        {children}
      </div>
    );
  })`

    width: 400px;
    height: 400px;
  `;

const Box = styled(({ name, className }: Box) => {
    const [{ isDragging }, drag] = useDrag({
      item: { name, type: ItemTypes.BOX },
      end: (item: Box | undefined, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {

          console.log(item, dropResult);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={drag} className={className} style={{opacity}}>
        {name}
      </div>
    );
  })`

  `;

  const Group = styled(({ name, className, children }: Group) => {
    const [{ isDragging }, drag] = useDrag({
      item: { name, type: ItemTypes.GROUP },
      end: (item: Box | undefined, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {

          console.log(item, dropResult);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={drag} className={className} style={{opacity}}>
        {name}
        {children}
      </div>
    );
  })`
background: #ccc;
  `;

const Drag = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Box name={'Drag'} />
            <Group name={'Group-1'}>
                <DropZone name={'group'}>
                    <Box name={'item 1'} />
                    <Box name={'item 2'} />
                    <Box name={'item 3'} />
                    <Box name={'item 4'} />
                    <Box name={'item 5'} />
                </DropZone>
            </Group>
            <Group name={'Group-1'}>
                <DropZone name={'group-2'}>
                    <Box name={'item 6'} />
                    <Box name={'item 7'} />
                    <Box name={'item 8'} />
                    <Box name={'item 9'} />
                    <Box name={'item 10'} />
                </DropZone>
            </Group>
            <DropZone name={'main'} />
        </DndProvider>
    );
};

export default Drag;
