import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />
      <Hobbies />
      <Contact />
      <Footer />
    </main>
  );
}
