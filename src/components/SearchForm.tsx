import { useState } from 'react';
import { Button, Container, Form, InputGroup, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGitHubIssuesThunk } from '../store/actions';

export default function SearchForm() {
  const [repoUrl, setRepoUrl] = useState('');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const error = useAppSelector((state) => state.app.error);

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