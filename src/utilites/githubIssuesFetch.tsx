export interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string;
    user: {
      login: string;
    };
    comments: number;
    state: string;
    labels: Array<{
      name: string;
    }>;
  }
  
  export async function fetchGitHubIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const issues: GitHubIssue[] = await response.json();
      return issues;
    } catch (error) {
      console.error("Error fetching GitHub issues:", error);
      throw error;
    }
  }
  