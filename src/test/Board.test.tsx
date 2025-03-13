import { render, screen } from '@testing-library/react';
import Board from '../components/Board';
import { ItemType } from '../components/Item'

jest.mock("@hello-pangea/dnd", () => ({
    Droppable: ({ children }: { children: any }) =>
      children({
        innerRef: jest.fn(),
        droppableProps: {},
        placeholder: null,
      }),
    Draggable: ({ children }: { children: any }) =>
      children({
        innerRef: jest.fn(),
        draggableProps: {},
        dragHandleProps: {},
      }),
    DragDropContext: ({ children }: { children: any }) => <>{children}</>,
  }));


jest.mock('../components/Item', () => {
  return {
    __esModule: true,
    default: ({ item }: { item: ItemType }) => (
      <div data-testid={`item-${item.id}`}>
        <div data-testid="item-title">{item.title}</div>
        <div data-testid="item-description">{item.description}</div>
      </div>
    )
  };
});

describe('Board Component', () => {
  const mockItems = [
    {
      id: '1',
      number: '101',
      title: 'Fix navigation bug',
      description: 'The navigation is broken in mobile view',
      date: 'Today',
      person: 'johnsmith',
      comments: 5
    },
    {
      id: '2',
      number: '102',
      title: 'Update documentation',
      description: 'Documentation needs to be updated with new features',
      date: 'Yesterday',
      person: 'janesmith',
      comments: 2
    }
  ];

  it('renders items with correct content', () => {
    const columnId = 'todo';
    
    render(<Board columnId={columnId} items={mockItems} />);
    
    const itemTitles = screen.getAllByTestId('item-title');
    const itemDescriptions = screen.getAllByTestId('item-description');
    
    expect(itemTitles[0].textContent).toBe('Fix navigation bug');
    expect(itemDescriptions[0].textContent).toBe('The navigation is broken in mobile view');
    
    expect(itemTitles[1].textContent).toBe('Update documentation');
    expect(itemDescriptions[1].textContent).toBe('Documentation needs to be updated with new features');
  });
});