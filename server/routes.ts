import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import type { GitHubRepository, GitHubUser } from "@shared/schema";

const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required")
});

export async function registerRoutes(app: Express): Promise<Server> {
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

      const userData: GitHubUser = await response.json();
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

      const reposData: GitHubRepository[] = await response.json();
      
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

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // In a real application, you would send an email here
      console.log('New contact message:', message);
      
      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to send message' });
      }
    }
  });

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
