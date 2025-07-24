import type { GitHubRepository, GitHubUser } from "@shared/schema";

export const GITHUB_USERNAME = "vivek123r";

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`/api/github/user/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user data');
  }
  return response.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepository[]> {
  const response = await fetch(`/api/github/repos/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }
  return response.json();
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Dart': '#00B4AB',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
  };
  
  return colors[language || ''] || '#858585';
}

export function getTechFilter(language: string | null, repoName: string): string {
  if (!language) return 'web';
  
  const lowerName = repoName.toLowerCase();
  const lowerLang = language.toLowerCase();
  
  if (lowerLang === 'dart' || lowerName.includes('flutter')) return 'flutter';
  if (lowerLang === 'python') return 'python';
  if (lowerLang === 'javascript' || lowerLang === 'typescript') return 'javascript';
  
  return 'web';
}
