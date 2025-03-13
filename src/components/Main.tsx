import { Card, Col, Container, Row } from 'react-bootstrap';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Board from './Board';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateColumns } from '../store/actions';


export default function Main() {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.app.columns);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;

    if (sourceColumn === destinationColumn) {
    
      const newItems = [...columns[sourceColumn]];
      const [movedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, movedItem);

      const newColumns = {
        ...columns,
        [sourceColumn]: newItems,
      };
      
      dispatch(updateColumns(newColumns));
    } else {
  
      const sourceItems = [...columns[sourceColumn]];
      const destinationItems = [...columns[destinationColumn]];
      const [movedItem] = sourceItems.splice(result.source.index, 1);
      destinationItems.splice(result.destination.index, 0, movedItem);

      const newColumns = {
        ...columns,
        [sourceColumn]: sourceItems,
        [destinationColumn]: destinationItems,
      };
      
      dispatch(updateColumns(newColumns));
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