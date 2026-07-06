import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ServicePage } from './pages/ServicePage';
import { ProjectPage } from './pages/ProjectPage';
import { JournalList } from './pages/JournalList';
import { JournalDetail } from './pages/JournalDetail';

// Helper component to force scroll-to-top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
    };

    // Scroll instantly
    handleScroll();

    // Sync with next render frame and a minor delay for layout updates
    const frameId = requestAnimationFrame(() => {
      handleScroll();
      const timerId = setTimeout(handleScroll, 50);
      return () => clearTimeout(timerId);
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/journal" element={<JournalList />} />
          <Route path="/journal/:id" element={<JournalDetail />} />
        </Routes>
      </Layout>
      <Analytics />
    </Router>
  );
}

export default App;
