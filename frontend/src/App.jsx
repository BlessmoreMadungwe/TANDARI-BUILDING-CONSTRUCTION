import React from 'react';
import { useEffect, useState } from 'react';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Gallery from './pages/Gallery.jsx';
import Hero from './pages/Hero.jsx';
import IntroStrip from './pages/IntroStrip.jsx';
import Projects from './pages/Projects.jsx';
import Safety from './pages/Safety.jsx';
import Services from './pages/Services.jsx';
import Team from './pages/Team.jsx';
import Testimonials from './pages/Testimonials.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { normalizePath } from './router.js';

// App is the top-level layout. It keeps the header/footer visible and swaps the main page content.
function App() {
  // Store the current browser path so this simple client-side router can render the correct page.
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const isAdminPage = path.startsWith('/admin');

  useEffect(() => {
    // Listen for browser back/forward navigation and custom route changes from NavLink.
    const handleRouteChange = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <>
      {!isAdminPage && <Header />}
      <main>{renderPage(path)}</main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingWhatsApp />}
    </>
  );
}

// Maps each URL path to the page component that should be displayed.
function renderPage(path) {
  switch (path) {
    case '/':
      return (
        <>
          <Hero />
          <IntroStrip />
          <Testimonials />
        </>
      );
    case '/about':
      return <About />;
    case '/services':
      return <Services />;
    case '/team':
      return <Team />;
    case '/projects':
      return (
        <>
          <Projects />
          <Gallery />
        </>
      );
    case '/safety':
      return <Safety />;
    case '/contact':
      return <Contact />;
    case '/admin':
      return <AdminDashboard />;
    default:
      return (
        <>
          <Hero />
          <IntroStrip />
        </>
      );
  }
}

export default App;
