import { Code, Database, Globe, Smartphone, Server, GitBranch, Code2 } from "lucide-react";

export default function Skills() {
  const skills = [
    {
      category: "Frontend",
      icon: <Globe className="w-8 h-8" />,
      technologies: ["React", "JavaScript", "HTML5", "CSS", "Tailwind CSS", "Responsive Design","Flutter"]
    },
    {
      category: "Backend",
      icon: <Server className="w-8 h-8" />,
      technologies: ["Node.js", "Express.js", "REST APIs", "Authentication", "Session Management"]
    },
    {
      category: "Tools & Others",
      icon: <GitBranch className="w-8 h-8" />,
      technologies: ["Git", "GitHub", "Firebase", "AWS", "CI/CD", "Docker","Google Cloud","Kubernetes"]
    },
    {
      category: "Languages",
      icon: <Code2 className="w-8 h-8" />,
      technologies: ["dart", "Python", "JavaScript", "Java","SQL"]
    }

  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors">Skills & Technologies</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 border border-transparent dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4 text-blue-600 dark:text-blue-400">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-4 transition-colors">
                {skill.category}
              </h3>
              <ul className="space-y-2">
                {skill.technologies.map((tech, techIndex) => (
                  <li 
                    key={techIndex}
                    className="text-gray-600 dark:text-gray-300 text-sm text-center py-1 px-3 bg-white dark:bg-gray-800 rounded-md transition-colors"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border border-transparent dark:border-gray-800 rounded-lg p-8 transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors">Always Learning</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              I'm constantly exploring new technologies and improving my skills. 
              Currently diving deeper into full-stack development and modern web practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
