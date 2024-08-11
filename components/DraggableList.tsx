
import { nanoid } from 'nanoid';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type DraggableListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number, provided: any) => React.ReactNode;
  onDragEnd: (result: any) => void;
};

const DraggableList = <T extends { id: string }>({
  items,
  renderItem,
  onDragEnd
}: DraggableListProps<T>) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={nanoid()}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={` rounded-2xl shadow-md p-2 ${snapshot.isDragging ? 'shadow-2xl' : ''}`}
                  >
                    {renderItem(item, index, provided)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
