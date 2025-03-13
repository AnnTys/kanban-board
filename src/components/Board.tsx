import { Droppable, Draggable } from "@hello-pangea/dnd";
import React from "react";
import Item, { ItemType } from "./Item";

interface BoardProps {
  columnId: string;
  items: ItemType[];
}

const Board: React.FC<BoardProps> = ({ columnId, items }) => {
  return (
    <Droppable droppableId={columnId} >
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.droppableProps} 
          className="p-3 min-h-40"
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="mb-2"
                >
                  <Item item={item} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board;