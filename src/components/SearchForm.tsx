import { Button, Container, Form, InputGroup } from 'react-bootstrap';

export default function SearchForm() {
	return (
		<Container>
				<InputGroup>
					<Form.Control
						type="search"
						placeholder="Enter repo URL"
						aria-describedby="searchInput"
					/>
					<Button variant="light" id="searchInput">
						Load issues
					</Button>
				</InputGroup>
		</Container>
	);
}
