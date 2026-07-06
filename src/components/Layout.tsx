import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageLoader } from './PageLoader';
import { CustomCursor } from './CustomCursor';
import { Header } from './Header';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change (or scroll to hash)
  useEffect(() => {
    if (loading) return;

    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, loading]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    // Synchronize Lenis smooth scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once Lenis initializes and layouts settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
      clearTimeout(refreshTimer);
    };
  }, [loading]);

  return (
    <>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
          {/* Custom mouse follower interaction cursor */}
          <CustomCursor />

          {/* Floating background lights container to prevent horizontal overflow */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            <div className="blurred-light-1" />
            <div className="blurred-light-2" />
          </div>

          {/* Global Header */}
          <Header />

          {/* Main Content Area */}
          <main style={{ flex: 1, paddingTop: '100px' }}>
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};
