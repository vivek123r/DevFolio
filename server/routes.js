import { createServer } from "http";
import { storage } from "./storage.js";
import { z } from "zod";

export async function registerRoutes(app) {
  // GitHub API integration
  app.get("/api/github/user/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'User-Agent': 'Portfolio-Website',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const userData = await response.json();
      res.json(userData);
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      res.status(500).json({ error: 'Failed to fetch GitHub user data' });
    }
  });

  app.get("/api/github/repos/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
        headers: {
          'User-Agent': 'Portfolio-Website',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const reposData = await response.json();
      
      // Filter out private repos and sort by recent activity and stars
      const publicRepos = reposData
        .filter(repo => !repo.private)
        .sort((a, b) => {
          const aScore = a.stargazers_count + a.forks_count;
          const bScore = b.stargazers_count + b.forks_count;
          return bScore - aScore;
        });

      res.json(publicRepos);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
    }
  });

  // Contact form endpoint removed - now using FormSubmit.co

  // Get all contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
