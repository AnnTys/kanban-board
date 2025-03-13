import { useUrlSelector } from '../store/hooks';

export default function ProfileRepo() {
	const url = useUrlSelector((state) => state.url);

	if (!url.owner || !url.repo) {
		return null;
	}
	return (
		<>
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
			{url.stars !== "" && (
				<> ⭐ {url.stars} stars</>
			)}
		</>
	);
}
