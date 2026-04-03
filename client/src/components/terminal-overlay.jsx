import { useState, useRef, useEffect } from "react";
import { X, Maximize2, Minimize2, Terminal as TerminalIcon } from "lucide-react";
import { GITHUB_USERNAME } from "../lib/github.js";

const COMMANDS = {
  help: `Available commands:
  whoami     - Print user information
  about      - Learn more about my background
  skills     - List my technical skills
  projects   - View featured projects
  experience - View professional work history
  contact    - How to reach me
  clear      - Clear the terminal screen
  github     - Link to my GitHub
  date       - Print current date and time
  sudo       - Superuser do (Try it!)`,

  about: `Hello! I'm Vivek R.
I am a self-driven IT undergraduate specializing in Mobile Development, Cloud Computing, and Web Applications. 
I am passionate about building innovative solutions and am currently pursuing my B.Tech at Viswajyothi College of Engineering and Technology.`,

  skills: `Technical Skills:
- Languages: Python, JavaScript, Dart, SQL, HTML/CSS
- Frameworks & Tools: React, Next.js, Node.js, Flutter, Jest
- Cloud & DevOps: AWS (EC2, S3, IAM, CloudWatch), Docker, Kubernetes, Firebase, Git
- Automation & AI: n8n, LLMs/Generative AI APIs, LangGraph (AI Agents)`,

  projects: `Featured Projects:
1. AI-Extension Builder: A React/Node.js platform using autonomous AI agents to generate production-ready browser extensions.
2. System Monitor: A cross-platform tool (Python/Flutter) for real-time monitoring and 100% private file sharing.
3. AI-Powered Email Automation: n8n workflow for parsing emails and automated scheduling.
4. Expense Tracker App: Privacy-focused Flutter app that parses SMS transactions with 99% accuracy.`,

  experience: `Professional Experience:
- AWS Intern at Cydez Technologies:
  * Managed scalable web applications on EC2 and S3, reducing deployment time by 20%.
  * Configured IAM roles and monitored health via CloudWatch to maintain 99.9% uptime.`,

  contact: `Ready to connect?
Email: vivek987pm@gmail.com
Phone: 85906 09366
Location: Thodupuzha, Kerala
LinkedIn: VIVEK R`,

  whoami: `vivek`,
  github: `https://github.com/vivek123r`, // Update with your actual username
  date: new Date().toLocaleString(),
  sudo: `Nice try! This incident will be reported to the cloud logs. 🚨`,
};

export default function TerminalOverlay({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { text: "Welcome to Vivek's Terminal! Type 'help' to see available commands.", type: "system" }
  ]);
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { text: `guest@vivek-portfolio:~$ ${input}`, type: "command" }];

    if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "date") {
      newHistory.push({ text: new Date().toString(), type: "system" });
      setHistory(newHistory);
    } else if (COMMANDS[cmd]) {
      newHistory.push({ text: COMMANDS[cmd], type: "system" });
      setHistory(newHistory);
    } else {
      newHistory.push({ text: `bash: ${cmd}: command not found. Type 'help' for available commands.`, type: "error" });
      setHistory(newHistory);
    }

    setInput("");
  };

  return (
    <div 
      className="bg-[#1E1E1E] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full h-[400px] lg:h-[450px]"
    >
      {/* Terminal Header */}
      <div className="bg-[#323233] px-4 py-3 flex items-center justify-between border-b border-gray-900 select-none">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <TerminalIcon size={16} />
          <span>vivek@portfolio:~</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Close Terminal"
          >
            <X size={16} />
          </button>
        </div>
      </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 p-4 font-mono text-sm overflow-y-auto" 
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="mb-1 whitespace-pre-wrap">
              {line.type === "command" && (
                <span className="text-gray-300">{line.text}</span>
              )}
              {line.type === "system" && (
                <span className="text-green-400">{line.text}</span>
              )}
              {line.type === "error" && (
                <span className="text-red-400">{line.text}</span>
              )}
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex items-center mt-2">
            <span className="text-blue-400 mr-2">guest@vivek-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-300 border-none focus:ring-0 p-0"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        </div>
    </div>
  );
}
