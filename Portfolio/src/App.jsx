import { lazy, Suspense } from 'react';
import ScrollIndicator from './components/ScrollIndicator';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <ScrollIndicator />
      
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
        <About />
        <Projects />
        <Contact />
      </Suspense>
    </div>
  );
}