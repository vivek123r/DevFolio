import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { fetchGitHubRepos, GITHUB_USERNAME, getLanguageColor, getTechFilter } from "@/lib/github";
import type { GitHubRepository } from "@shared/schema";

const filterOptions = [
  { key: "all", label: "All Projects" },
  { key: "flutter", label: "Flutter" },
  { key: "python", label: "Python" },
  { key: "javascript", label: "JavaScript" },
  { key: "web", label: "Web Development" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: repositories, isLoading, error } = useQuery({
    queryKey: ["/api/github/repos", GITHUB_USERNAME],
    queryFn: () => fetchGitHubRepos(GITHUB_USERNAME),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const filteredRepos = repositories?.filter((repo) => {
    if (activeFilter === "all") return true;
    return getTechFilter(repo.language, repo.name) === activeFilter;
  }) || [];

  const ProjectCard = ({ repo }: { repo: GitHubRepository }) => {
    const techFilter = getTechFilter(repo.language, repo.name);
    const languageColor = getLanguageColor(repo.language);

    // Get appropriate stock image based on repo type
    const getRepoImage = (repoName: string, language: string | null) => {
      const name = repoName.toLowerCase();
      const lang = language?.toLowerCase() || '';
      
      if (name.includes('expense') || name.includes('tracker')) {
        return "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
      }
      if (name.includes('chatbot') || name.includes('ai')) {
        return "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
      }
      if (name.includes('portfolio') || name.includes('website')) {
        return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
      }
      if (name.includes('extension') || name.includes('builder')) {
        return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
      }
      if (name.includes('shop') || name.includes('ecommerce')) {
        return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
      }
      if (lang === 'python' || name.includes('ai')) {
        return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
      }
      
      // Default to code/development image
      return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
    };

    return (
      <Card className="group bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <CardContent className="p-6">
          <img
            src={getRepoImage(repo.name, repo.language)}
            alt={`${repo.name} project`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />

          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-tech-blue transition-colors">
              {repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-tech-blue"
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {repo.description || "A project showcasing modern development practices and clean code architecture."}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {repo.language && (
              <Badge
                variant="secondary"
                className="text-xs"
                style={{ backgroundColor: `${languageColor}20`, color: languageColor }}
              >
                {repo.language}
              </Badge>
            )}
            {repo.topics?.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs capitalize">
                {topic}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
              {repo.forks_count > 0 && (
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forks_count}</span>
                </div>
              )}
            </div>
            <span>{repo.language || "Text"}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProjectSkeleton = () => (
    <Card className="bg-white border border-gray-100">
      <CardContent className="p-6">
        <Skeleton className="w-full h-48 mb-4" />
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-5" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of my latest work in cloud computing, mobile development, and automation
          </p>
        </div>

        {/* Project Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-3">
            {filterOptions.map((option) => (
              <Button
                key={option.key}
                variant={activeFilter === option.key ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveFilter(option.key)}
                className={
                  activeFilter === option.key
                    ? "bg-tech-blue hover:bg-blue-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load GitHub repositories</p>
            <p className="text-gray-500">Please check your connection and try again</p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
            : filteredRepos.slice(0, 12).map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
        </div>

        {/* No projects message */}
        {!isLoading && !error && filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for the selected filter</p>
          </div>
        )}

        {/* GitHub Profile Link */}
        <div className="text-center mt-12">
          <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3"
            >
              <Github className="w-5 h-5" />
              <span>View All Projects on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
