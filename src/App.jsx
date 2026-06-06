import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProject from './components/FeaturedProject';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Curriculum from './components/Curriculum';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <FeaturedProject />
        <Projects />
        <About />
        <Skills />
        <Curriculum />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
