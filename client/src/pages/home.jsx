import Navigation from "../components/navigation.jsx";
import Hero from "../components/hero.jsx";
import Skills from "../components/skills.jsx";
import Projects from "../components/projects.jsx";
import Contact from "../components/contact.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navigation />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
