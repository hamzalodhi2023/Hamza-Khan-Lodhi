import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import { useTheme } from './lib/useTheme';
import { useIsMobile, usePrefersReducedMotion } from './lib/useMedia';

// The 3D scene is the heaviest chunk — lazy-load so first paint stays fast.
const Scene3D = lazy(() => import('./components/Scene3D'));

function Loader() {
  return (
    <div className="absolute inset-0 -z-10 grid-bg opacity-30" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const [showScene, setShowScene] = useState(false);
  const [loading, setLoading] = useState(true);

  // Lock scroll while the preloader is visible.
  useEffect(() => {
    document.body.classList.add('is-loading');
    return () => document.body.classList.remove('is-loading');
  }, []);

  const handleLoaded = useCallback(() => {
    setLoading(false);
    document.body.classList.remove('is-loading');
  }, []);

  // Mount the 3D scene after the main content has painted.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => setShowScene(true), 60);
      // store timeout id for cleanup via closure
      (window as unknown as { __sceneTimer?: number }).__sceneTimer = t;
    });
    return () => {
      cancelAnimationFrame(raf);
      const t = (window as unknown as { __sceneTimer?: number }).__sceneTimer;
      if (t) clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Skip link for keyboard users / screen readers */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to content
      </a>

      {/* Global background layers */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 grid-bg opacity-[0.35]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* 3D backdrop (desktop-heavy, dialled back on mobile) */}
      {showScene ? (
        <Suspense fallback={<Loader />}>
          <div className="pointer-events-none fixed inset-0 -z-10 opacity-90">
            <Scene3D isDark={theme === 'dark'} reducedMotion={reducedMotion} isMobile={isMobile} />
          </div>
        </Suspense>
      ) : (
        <Loader />
      )}

      {loading && <Preloader onDone={handleLoaded} />}
      <CustomCursor />

      <Navbar theme={theme} toggleTheme={toggle} />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
