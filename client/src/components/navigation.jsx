import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">
            <span className="text-tech-blue">Vivek</span> R
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-gray-600 hover:text-tech-blue transition-colors duration-300 ${
                  activeSection === item.id ? "text-tech-blue font-medium" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
                <div className="flex flex-col py-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsOpen(false);
                      }}
                      className={`text-left px-6 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300 ${
                        activeSection === item.id ? "text-blue-600 font-medium bg-blue-50" : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
