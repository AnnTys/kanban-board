import { useState } from 'react';
import { Button, Container, Form, InputGroup, Alert } from 'react-bootstrap';
import { useAppDispatch, useColumnsSelector } from '../store/hooks';
import { fetchGitHubIssuesThunk, setRepoInfo } from '../store/actions';

export default function SearchForm() {
  const [repoUrl, setRepoUrl] = useState('');
  const dispatch = useAppDispatch();
  const isLoading = useColumnsSelector((state) => state.columns.isLoading);
  const error = useColumnsSelector((state) => state.columns.error);

const getRepoStars = async (owner: string, repo: string): Promise<string> => {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch repository data: ${response.statusText}`);
        }

        const data = await response.json();
        return data.stargazers_count.toString( ); // Returns the number of stars
    } catch (error) {
        console.error("Error fetching stars:", error);
        return ""; // Return null in case of an error
    }
};
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      return;
    }

    try {
 
      let owner = '';
      let repo = '';
      
      if (repoUrl.includes('github.com')) {
        const urlParts = repoUrl.split('github.com/')[1]?.split('/');
        if (urlParts && urlParts.length >= 2) {
          owner = urlParts[0];
          repo = urlParts[1];
        }
      } else if (repoUrl.includes('/')) {
        const parts = repoUrl.split('/');
        if (parts.length >= 2) {
          owner = parts[0];
          repo = parts[1];
        }
      }
      
      if (!owner || !repo) {
        throw new Error('Invalid repository format. Please use owner/repo or github.com/owner/repo');
      }
      
     const stars = await getRepoStars(owner, repo);

      dispatch(setRepoInfo(owner, repo, stars));
      dispatch(fetchGitHubIssuesThunk(owner, repo));
      
    } catch (error) {
      console.error('Error parsing repo URL:', error);
    }
  };

  return (
    <Container className="mb-4">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter repo URL (e.g., facebook/react)"
            aria-describedby="searchInput"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            variant="primary" 
            id="searchInput" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load Issues'}
          </Button>
        </InputGroup>
      </Form>
      
      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}
    </Container>
  );
}