import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { GITHUB_USERNAME, getLanguageColor } from "../lib/github.js";

const customProjects = [
  {
    id: 1,
    name: "Expense Tracker InfoRint",
    description: "A comprehensive expense tracking application built with Flutter and Firebase. Features real-time expense monitoring, category-wise spending analysis, budget planning, and detailed financial reports with beautiful charts and graphs.",
    language: "Dart",
    topics: ["flutter", "firebase", "mobile", "expense-tracking", "budget-management"],
    html_url: `https://github.com/${GITHUB_USERNAME}/ExpenseTracker_sms-based`,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 2,
    name: "E-Shop",
    description: "Modern e-commerce website with clean UI/UX design. Features product catalog, shopping cart, secure payment integration, user authentication, order tracking, and push notifications. Built with React for cross-platform compatibility.",
    language: "Dart",
    topics: ["flutter", "ecommerce", "React", "ui-ux", "payment-integration"],
    html_url: `https://github.com/${GITHUB_USERNAME}/e-shop`,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 3,
    name: "DevFolio Portfolio",
    description: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features dynamic GitHub integration, contact form, project showcase, skills visualization, and optimized performance. Deployed with cloud infrastructure.",
    language: "JavaScript",
    topics: ["react", "javascript", "portfolio", "tailwindcss", "responsive"],
    html_url: `https://github.com/${GITHUB_USERNAME}/DevFolio`,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 4,
    name: "Chatbot - Extension",
    description: "A powerful Visual Studio Code extension that enhances developer productivity. Features code snippets, syntax highlighting, intelligent autocomplete, debugging tools, and seamless integration with popular frameworks and libraries.",
    language: "JavaScript",
    topics: ["vscode", "extension", "productivity", "developer-tools", "javascript"],
    html_url: `https://github.com/${GITHUB_USERNAME}/Extension`,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 5,
    name: "chatbot_python_webScraping",
    description: "Advanced web scraping application built with Python using BeautifulSoup, Scrapy, and Selenium. Features automated data extraction, anti-bot detection bypass, data cleaning and processing, export to multiple formats, and scheduled scraping tasks.",
    language: "Python",
    topics: ["python", "web-scraping", "automation", "data-extraction", "selenium"],
    html_url: `https://github.com/${GITHUB_USERNAME}/chatbot_python_webScraping`,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
  }
];

const filterOptions = [
  { key: "all", label: "All Projects" },
  { key: "flutter", label: "Flutter" },
  { key: "python", label: "Python" },
  { key: "javascript", label: "JavaScript" },
  { key: "web", label: "Web Development" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = customProjects.filter((project) => {
    if (activeFilter === "all") return true;
    
    const language = project.language.toLowerCase();
    const topics = project.topics.map(t => t.toLowerCase());
    
    switch (activeFilter) {
      case "flutter":
        return language === "dart" || topics.includes("flutter");
      case "python":
        return language === "python";
      case "javascript":
        return language === "javascript" || language === "typescript";
      case "web":
        return language === "javascript" || language === "typescript" || topics.includes("react") || topics.includes("web");
      default:
        return true;
    }
  });

  const ProjectCard = ({ project }) => {
    const languageColor = getLanguageColor(project.language);

    return (
      <div className="group bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 rounded-lg">
        <div className="p-6">
          <img
            src={project.image}
            alt={`${project.name} project`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />

          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {project.name}
            </h3>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 p-2 rounded transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-2 py-1 text-xs rounded"
              style={{ backgroundColor: `${languageColor}20`, color: languageColor }}
            >
              {project.language}
            </span>
            {project.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="px-2 py-1 text-xs capitalize border border-gray-200 rounded">
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-medium">Technology:</span>
              <span>{project.language}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              <button
                key={option.key}
                onClick={() => setActiveFilter(option.key)}
                className={`px-4 py-2 text-sm rounded transition-colors ${
                  activeFilter === option.key
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for the selected filter</p>
          </div>
        )}

        {/* GitHub Profile Link */}
        <div className="text-center mt-12">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
