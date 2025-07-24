import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Github, Download, MapPin, Code } from "lucide-react";
import { fetchGitHubUser, GITHUB_USERNAME } from "@/lib/github";

export default function Hero() {
  const { data: githubUser } = useQuery({
    queryKey: ["/api/github/user", GITHUB_USERNAME],
    queryFn: () => fetchGitHubUser(GITHUB_USERNAME),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="pt-20 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="mb-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Hi, I'm <span className="text-tech-blue">Vivek</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Cloud Developer & Mobile Engineer specializing in{" "}
                <span className="text-tech-blue font-semibold">AWS Cloud Services</span>,{" "}
                <span className="text-success-green font-semibold">Flutter Development</span>, and{" "}
                <span className="text-warning-amber font-semibold">DevOps Automation</span>
              </p>
              <p className="text-gray-500 mb-8">
                Building scalable cloud solutions and cross-platform mobile applications with modern technologies and best practices.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Profile
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white"
                onClick={scrollToContact}
              >
                <Download className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-tech-blue" />
                <span>Available for Remote Work</span>
              </div>
              {githubUser && (
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-success-green" />
                  <span>{githubUser.public_repos} public repositories</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern developer workspace"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
                alt="Cloud computing visualization"
                className="absolute -top-6 -right-6 w-32 h-24 rounded-lg shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
