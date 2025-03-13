import { Col, Container, Row } from 'react-bootstrap';
import { useUrlSelector } from '../store/hooks';

export default function ProfileRepo() {
	const url = useUrlSelector((state) => state.url);

	if (!url.owner || !url.repo) {
		return null;
	}

	const formatStars = (stars: string | number): string => {
		const numStars = typeof stars === "string" ? parseInt(stars, 10) : stars;
	  
		if (isNaN(numStars)) return "0"; // Fallback for invalid data
	  
		if (numStars >= 1_000_000) {
			return `${(numStars / 1_000_000).toFixed(1)}M`;
		}
		if (numStars >= 1_000) {
			return `${Math.floor(numStars / 1_000)}k`;
		}
		return numStars.toString();
	};

	return (
		<Container>
			<Row>
				<Col>
					<strong>
						<a
							href={`https://github.com/${url.owner}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{url.owner}
						</a>
						&gt;{' '}
						<a
							href={`https://github.com/${url.owner}/${url.repo}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{url.repo}
						</a>{' '}
						{url.stars !== '' && <> ⭐ {formatStars(url.stars)} stars</>}
					</strong>
				</Col>
			</Row>
		</Container>
	);
}
