import { Card, Col, Container, Row } from 'react-bootstrap';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Board from './Board';
import { useState } from 'react';
import { Item } from './Item';

export interface ColumnsState {
  [key: string]: Item[];
}

export default function Main() {
  const initialColumns: ColumnsState = {
    todo: [
      { id: "1", title: "Fix Bug", description: "Issue in login", person: "John", comments: 2 },
      { id: "2", title: "Add Feature", description: "Dark mode", person: "Jane", comments: 5 },
    ],
    inProgress: [
      { id: "3", title: "Fix Buaag", description: "Issue in login", person: "John", comments: 2 }
    ],
    done: [],
  };

  const [columns, setColumns] = useState<ColumnsState>(initialColumns);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;

    if (sourceColumn === destinationColumn) {
      // Reordering within the same column
      const newItems = [...columns[sourceColumn]];
      const [movedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, movedItem);

      setColumns((prev) => ({
        ...prev,
        [sourceColumn]: newItems,
      }));
    } else {
      // Moving between columns
      const sourceItems = [...columns[sourceColumn]];
      const destinationItems = [...columns[destinationColumn]];
      const [movedItem] = sourceItems.splice(result.source.index, 1);
      destinationItems.splice(result.destination.index, 0, movedItem);

      setColumns((prev) => ({
        ...prev,
        [sourceColumn]: sourceItems,
        [destinationColumn]: destinationItems,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <Row className="gy-3">
          <Col xs={12} md={4}>
            <Card>
              <Card.Title className="p-3">To Do</Card.Title>
              <Board columnId="todo" items={columns.todo} />
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Title className="p-3">In Progress</Card.Title>
              <Board columnId="inProgress" items={columns.inProgress} />
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Title className="p-3">Done</Card.Title>
              <Board columnId="done" items={columns.done} />
            </Card>
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
}