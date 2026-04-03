import { useState } from "react";
import { X, ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample additional screenshots array - you'll need to add actual screenshots for your projects
  const projectScreenshots = {
    // Each project can have multiple screenshots
    "System Monitor": [
      "./images/SystemMonitor1.png",
      "./images/SystemMonitor2.png",
      "./images/SystemMonitor3.png",
      "./images/SystemMonitor4.jpg",
      "./images/SystemMonitor5.jpg",
      "./images/SystemMonitor6.jpg",
      "./images/SystemMonitor7.jpg",
    ],
    "Expense Tracker MINT": [
      "./images/expenseTracker.png",  // Main image
      "./images/expenseTracker1.png",  // Add these images to your public/images folder
      "./images/expenseTracker2.png",
      "./images/expenseTracker3.png",
    ],
    "Expense Tracker MINT (SMS-based)": [
      "./images/expenseTracker.png",
      "./images/expenseTracker1.png",
      "./images/expenseTracker2.png",
      "./images/expenseTracker3.png",
    ],
    "Extension Builder EXFORGE": [
        "./images/Exforge1.png",
        "./images/Exforge2.png",
        "./images/Exforge3.png",
        "./images/Exforge4.png",
        ],
      "E-Shop":[
        "./images/Eshop1.png",
        "./images/Eshop2.png",
        "./images/Eshop3.png",
        "./images/Eshop4.png",
      ]
    // Add more projects as needed
  };

  // Get screenshots for current project or use main image as fallback
  const screenshots = projectScreenshots[project?.name] || [project?.image];
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 p-1 bg-gray-200 hover:bg-gray-300 rounded-full z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Image gallery */}
          <div className="relative">
            <img 
              src={screenshots[currentImageIndex]} 
              alt={`${project.name} screenshot ${currentImageIndex + 1}`}
              className="w-full h-[400px] object-contain rounded-lg cursor-default"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'none' }}
            />
            
            {screenshots.length > 1 && (
              <>
                {/* Image navigation */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <ArrowRight size={20} />
                </button>

                {/* Image indicator dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {screenshots.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Project details */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
              
              <div className="flex space-x-3">
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Github size={18} />
                  <span>Code</span>
                </a>
                <a
                  href={project.demo_url || project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <ExternalLink size={18} />
                  <span>Demo</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-800">
                {project.language}
              </span>
              {project.topics.map((topic) => (
                <span key={topic} className="px-3 py-1 text-xs capitalize bg-gray-100 rounded">
                  {topic}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-gray-700">
              <h3 className="font-semibold text-lg">Project Overview</h3>
              <p className="leading-relaxed">
                {project.description}
              </p>

              {/* For System Monitor project, show more detailed info */}
              {project.name === "System Monitor" && (
                <div className="mt-4 space-y-3">
                  <h3 className="font-semibold text-lg">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Real-time PC metrics monitoring (CPU, RAM, GPU, Disk, Network, Battery)</li>
                    <li>Remote power control and system shutdown/restart</li>
                    <li>Remote brightness control for displays</li>
                    <li>Local LAN file sharing with QR code generation</li>
                    <li>Multi-user device management and authentication</li>
                    <li>Command logging and remote execution capabilities</li>
                    <li>Cross-platform mobile app (iOS, Android, Web, Linux, macOS, Windows)</li>
                  </ul>
                  
                  <h3 className="font-semibold text-lg pt-2">Technologies Used</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Backend: Python with FastAPI framework</li>
                    <li>Desktop Client: Python with CustomTkinter GUI</li>
                    <li>System Monitoring: Psutil and GPUtil libraries</li>
                    <li>Mobile App: Flutter/Dart for cross-platform development</li>
                    <li>Database: Firebase Firestore for real-time data sync</li>
                    <li>Authentication: Firebase Auth for secure access</li>
                    <li>Deployment: Vercel for backend hosting</li>
                  </ul>
                </div>
              )}

              {/* For Extension Builder EXFORGE project, show more detailed info */}
              {project.name === "Extension Builder EXFORGE" && (
                <div className="mt-4 space-y-3">
                  <h3 className="font-semibold text-lg">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>AI agent that autonomously writes production-ready code</li>
                    <li>Real-time code typing and generation from natural language prompts</li>
                    <li>Automatic generation of extensions, views, and webviews</li>
                    <li>Intelligent configuration file creation and management</li>
                    <li>Automated test suite generation</li>
                    <li>Comprehensive documentation auto-generation</li>
                    <li>From idea to publishable extension in minutes</li>
                  </ul>
                  
                  <h3 className="font-semibold text-lg pt-2">Technologies Used</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Backend: Python with LangChain framework</li>
                    <li>AI/LLM Integration: LangChain for agent orchestration</li>
                    <li>Code Generation: AI-powered code analysis and synthesis</li>
                    <li>Frontend: JavaScript, HTML, CSS for extension UI</li>
                    <li>Natural Language Processing for prompt understanding</li>
                    <li>Automated code typing and real-time generation</li>
                  </ul>
                </div>
              )}

              {/* For Expense Tracker project, show more detailed info */}
              {(project.name === "Expense Tracker MINT" || project.name === "Expense Tracker MINT (SMS-based)") && (
                <div className="mt-4 space-y-3">
                  <h3 className="font-semibold text-lg">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Real-time expense monitoring and tracking</li>
                    <li>Category-wise spending analysis with intuitive charts</li>
                    <li>Budget planning with custom limits and alerts</li>
                    <li>Detailed financial reports with export capabilities</li>
                    <li>Cross-platform compatibility with cloud data sync</li>
                    <li>Secure authentication and data encryption</li>
                  </ul>
                  
                  <h3 className="font-semibold text-lg pt-2">Technologies Used</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Flutter for cross-platform mobile development</li>
                    <li>Firebase for backend services and authentication</li>
                    <li>Cloud Firestore for real-time database</li>
                    <li>Firebase Analytics for usage tracking</li>
                    <li>Provider pattern for state management</li>
                    <li>Chart libraries for visual data representation</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}