import { Card } from "react-bootstrap";

export interface Item {
  id: string;
  number: string;
  title: string;
  description: string;
  date: string;
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
        <Card.Text>{"#" + item.number + " " + item.date }</Card.Text>
        <Card.Text className="text-muted">
          <small>{item.person} | Comments: {item.comments}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Item;