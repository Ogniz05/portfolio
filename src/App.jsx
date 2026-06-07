import { Component } from 'react';
import { Analytics } from '@vercel/analytics/react';
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

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar />
      <main>
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <FeaturedProject />
        <Projects />
        <About />
        <Skills />
        <Curriculum />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
