import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Cloud, Smartphone, Settings } from "lucide-react";

const skillCategories = [
  {
    title: "AWS Cloud Services",
    description: "Building scalable and reliable cloud infrastructure",
    icon: Cloud,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    skills: [
      { name: "EC2 & Lambda", level: 90 },
      { name: "S3 & CloudFront", level: 85 },
      { name: "RDS & DynamoDB", level: 80 },
      { name: "VPC & Security", level: 75 },
    ],
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications with native performance",
    icon: Smartphone,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    skills: [
      { name: "Flutter & Dart", level: 88 },
      { name: "React Native", level: 82 },
      { name: "Firebase Integration", level: 85 },
      { name: "App Store Deployment", level: 78 },
    ],
  },
  {
    title: "DevOps & Automation",
    description: "Streamlined deployment and infrastructure automation",
    icon: Settings,
    color: "text-green-600",
    bgColor: "bg-green-100",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    skills: [
      { name: "Docker & Kubernetes", level: 83 },
      { name: "CI/CD Pipelines", level: 80 },
      { name: "Infrastructure as Code", level: 75 },
      { name: "Monitoring & Logging", level: 78 },
    ],
  },
];

const technologies = [
  "Python", "JavaScript", "Dart", "React", "Flutter", "Node.js",
  "AWS", "Docker", "MongoDB", "PostgreSQL", "Git", "Linux"
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized in cloud computing, mobile development, and DevOps automation with modern technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <img
                      src={category.image}
                      alt={`${category.title} illustration`}
                      className="w-full h-40 object-cover rounded-xl mb-6"
                    />
                    <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`text-2xl ${category.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technology Stack */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-4 py-2 bg-white text-gray-700 font-medium shadow-md hover:shadow-lg transition-shadow cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
