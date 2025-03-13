import { Card } from "react-bootstrap";

export interface Item {
  id: string;
  title: string;
  description: string;
  person: string;
  comments: number;
}

interface ItemProps {
  item: Item;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <Card className="shadow">
      <Card.Body className="p-3">
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Text className="text-muted">
          <small>{item.person} | Comments: {item.comments}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Item;