import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Palette, Layers, Compass, ExternalLink } from 'lucide-react';
import gsap from 'gsap';

interface ProjectData {
  title: string;
  category: string;
  conceptAim: string;
  overview: string;
  designSystems: { colors: string[]; fonts: string[] };
  decisions: { title: string; desc: string }[];
  layoutStructure: string[];
}

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Concept project list data mapping
  const projectsDataMap: Record<string, ProjectData> = {
    'luxury-architecture': {
      title: 'Luxury Architecture Website',
      category: 'Web Design / UI Concept',
      conceptAim: 'Establish a visual language of mass, alignment, and scale matching high-end physical structures.',
      overview: 'A conceptual digital archive for a premium architecture studio. The layout features massive typography headers, strict horizontal grids, plenty of negative whitespace, and immersive image presentation blocks.',
      designSystems: {
        colors: ['#1A1A1A', '#F5F5F3', '#D4AF37', '#FFFFFF'],
        fonts: ['Neue Montreal', 'Satoshi']
      },
      decisions: [
        { title: 'Extreme Whitespace', desc: 'Emphasizing physical presence by leaving substantial screen area empty, creating breathing room for visuals.' },
        { title: 'Editorial Grids', desc: 'Asymmetric layout positions that feel curated rather than templated.' }
      ],
      layoutStructure: ['Fullscreen Cover Image Reveal', 'Interactive Studio Statement', 'Project Archive Asymmetrical Grid', 'Contact Information Slider']
    },
    'premium-gym': {
      title: 'Premium Gym Brand',
      category: 'Branding / Web Concept',
      conceptAim: 'Express athletic energy through stark minimalist typography and dark-mode elegance.',
      overview: 'A concept branding and landing page for an exclusive luxury athletic club. It avoids generic neon/bright designs, adopting instead deep gray gradients and sharp sans-serif fonts to communicate premium exclusivity.',
      designSystems: {
        colors: ['#0A0A0C', '#1E2025', '#FFFFFF', '#7C5CFC'],
        fonts: ['Clash Display', 'Inter']
      },
      decisions: [
        { title: 'Dark Contrast Theme', desc: 'Communicating high concentration, premium quality, and exclusive studio lighting.' },
        { title: 'Impact Typography', desc: 'Heavy headings that echo physical strength and active performance.' }
      ],
      layoutStructure: ['Hero Video Loop Frame', 'Membership Tiers Detailed Cards', 'Trainer Grid Hover Cards', 'Inquiry Consultation Slot']
    },
    'doctor-website': {
      title: 'Specialist Doctor Portal',
      category: 'Product Design / UI Concept',
      conceptAim: 'Replace medical anxiety with clean, trustworthy, and accessible layouts.',
      overview: 'A digital portal concept for a specialist practitioner. The user interface prioritizes clarity, accessible appointment pathways, soft pastel shades, and legible typography to establish patient trust and professional authority.',
      designSystems: {
        colors: ['#FFFFFF', '#E3F2FD', '#1E88E5', '#37474F'],
        fonts: ['General Sans', 'Manrope']
      },
      decisions: [
        { title: 'Clear Information Pathways', desc: 'Simplifying booking options and clinical profiles to ease navigation.' },
        { title: 'Calming Visual Tones', desc: 'Soft blues and warm grays to convey professional competence and calm.' }
      ],
      layoutStructure: ['Doctor Introduction & Bio', 'Interactive Service Selection', 'Patient Portal Scheduling Widget', 'FAQ accordion details']
    },
    'coffee-brand': {
      title: 'Artisanal Coffee Brand',
      category: 'E-Commerce / Visual Concept',
      conceptAim: 'Translate rich organic textures and aroma into clean editorial layouts.',
      overview: 'A conceptual e-commerce design for an artisanal coffee roastery. The visual styling pairs warm earth tones with elegant serif headings, communicating premium craftsmanship and small-batch dedication.',
      designSystems: {
        colors: ['#FDFBF7', '#3E2723', '#D7CCC8', '#111111'],
        fonts: ['Playfair Display', 'Inter']
      },
      decisions: [
        { title: 'Texture & Detail Focus', desc: 'Using micro-shots of roasted beans and package prints to highlight tactile craft.' },
        { title: 'Elegant Typography pairing', desc: 'Serif headings paired with minimal body fonts to echo tradition.' }
      ],
      layoutStructure: ['Roaster Heritage Hero Block', 'Single-Origin Collection Grid', 'Tactile packaging mockups', 'Subscription details box']
    },
    'jewelry-store': {
      title: 'Jewelry Boutique Concept',
      category: 'E-Commerce Website Concept',
      conceptAim: 'Establish light-reflective design elements mimicking precious diamonds and metal.',
      overview: 'An upscale boutique store concept. Glassmorphic overlays, clean borders, and soft shadows highlight fine necklaces and rings without competing for attention.',
      designSystems: {
        colors: ['#FFFFFF', '#FAF9F6', '#8E8E93', '#111111'],
        fonts: ['Cormorant Garamond', 'Geist']
      },
      decisions: [
        { title: 'Minimalist Card Design', desc: 'Removing all background noise to let jewelry details shine.' },
        { title: 'Reflective Glass Overlays', desc: 'Applying backdrop-filters to overlay modules, suggesting display glass.' }
      ],
      layoutStructure: ['Boutique Introduction Slider', 'Interactive Product Grid', 'Aesthetic Detail Showcase', 'Inquiry Booking form']
    },
    'restaurant': {
      title: 'Michelin Restaurant Site',
      category: 'Interaction Design Concept',
      conceptAim: 'Build anticipation for fine dining through visual menu stories.',
      overview: 'An interactive menu and booking experience concept for a fine dining restaurant. The interface guides visitors through the dinner course menu visually, mimicking the flow of dining.',
      designSystems: {
        colors: ['#0B0B0C', '#242426', '#E5A93C', '#FFFFFF'],
        fonts: ['Neue Montreal', 'Cabinet Grotesk']
      },
      decisions: [
        { title: 'Sensory Micro-animations', desc: 'Staggered elements mimicking the curated progression of tasting menus.' },
        { title: 'Elegant Booking Portal', desc: 'Clean date selection matrices to ensure a seamless reservation flow.' }
      ],
      layoutStructure: ['Atmospheric Kitchen Intro', 'Course Menu Staggered Story', 'Reservation Scheduler Card', 'Location Contact footer']
    },
    'fashion-brand': {
      title: 'Aesthetic Fashion Brand',
      category: 'Web & Visual Identity Concept',
      conceptAim: 'Create modern visual portfolios inspired by streetwear catalogs.',
      overview: 'An online lookbook and catalog concept for a modern fashion designer. Big fonts, asymmetrical imagery grids, and dynamic filter tags provide a premium, interactive lookbook feel.',
      designSystems: {
        colors: ['#FFFFFF', '#EAEAEA', '#111111', '#B496FF'],
        fonts: ['Clash Display', 'Inter']
      },
      decisions: [
        { title: 'Catalog Layout Structures', desc: 'Dynamic column spacing adjustments to adapt grids like modern fashion lookbooks.' },
        { title: 'Action Overlay Effects', desc: 'Floating buy details cards that follow active selection points.' }
      ],
      layoutStructure: ['Seasonal Lookbook Hero Frame', 'Modular clothing grid showcase', 'Designer details layout', 'Newsletter collection slider']
    },
    'fitness-coach': {
      title: 'Personal Fitness Coach app',
      category: 'UI/UX Design / App Concept',
      conceptAim: 'Ensure clear information architecture for training tracking.',
      overview: 'A mobile-first web app concept tracking training plans and scheduling. Bold visual metrics and simple tap targets allow easy, high-speed usage during active exercise sessions.',
      designSystems: {
        colors: ['#F6F7F9', '#1C1C1E', '#30D158', '#111111'],
        fonts: ['Satoshi', 'Inter']
      },
      decisions: [
        { title: 'Stark High Contrast', desc: 'Enabling high outdoor screen legibility for track fields or outdoor gyms.' },
        { title: 'Immediate Call Targets', desc: 'Large action keys allowing easy taps during dynamic workouts.' }
      ],
      layoutStructure: ['App Dashboard Concept Frame', 'Routine Customizer Interface', 'Interactive progress line charts', 'Direct Message trainer panel']
    },
    'real-estate': {
      title: 'Ultra-Luxury Real Estate',
      category: 'Interactive Design Concept',
      conceptAim: 'Sell high-value spaces through immersive horizontal storytelling layouts.',
      overview: 'A conceptual visual website for premium real estate. Instead of listing tables, it displays massive full-screen images and maps to emphasize neighborhood culture, design, and size.',
      designSystems: {
        colors: ['#FFFFFF', '#F0EDE6', '#4A3B32', '#111111'],
        fonts: ['Neue Montreal', 'General Sans']
      },
      decisions: [
        { title: 'Horizontal Scroll Story', desc: 'Guiding readers horizontally through architectural spaces in a panoramic flow.' },
        { title: 'Interactive Amenity Overlays', desc: 'Interactive hotspots displaying details directly on top of building visual maps.' }
      ],
      layoutStructure: ['Scenic property cover pane', 'Architectural detail details block', 'Interactive residence layout map', 'Exclusive booking inquiries form']
    },
    'saas-dashboard': {
      title: 'Analytical SaaS Dashboard',
      category: 'Frontend Development Concept',
      conceptAim: 'Visualize complex multi-layered data arrays in neat modular blocks.',
      overview: 'A clean, modern SaaS analytical dashboard layout. It features custom analytical charts, minimal glass widgets, activity feeds, and configuration settings, showing data organization logic.',
      designSystems: {
        colors: ['#F6F7F9', '#FFFFFF', '#7C5CFC', '#111111'],
        fonts: ['Geist', 'Inter']
      },
      decisions: [
        { title: 'Modular Card Structures', desc: 'Arranging grids inside clean, draggable glass cards to show custom dashboard setups.' },
        { title: 'Dynamic Visual Charts', desc: 'Custom line and bar charts using clean SVG curves for clean dashboard scaling.' }
      ],
      layoutStructure: ['Dashboard layout Overview Pane', 'Metrics Overview Cards', 'Analytical Charts Grid', 'Activity Settings Column']
    }
  };

  const project = id ? projectsDataMap[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Concept Project Not Found</h2>
        <p style={{ marginBottom: '20px' }}>The requested concept design page does not exist.</p>
        <Link to="/" style={{ color: 'var(--accent)', fontWeight: 600 }}>Back to Homepage</Link>
      </div>
    );
  }

  // Related projects list
  const relatedProjects = Object.keys(projectsDataMap)
    .filter(key => key !== id)
    .map(key => ({ id: key, title: projectsDataMap[key].title, category: projectsDataMap[key].category }));

  return (
    <div style={{ paddingBottom: '100px' }}>

      {/* Navigation */}
      <div className="container" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Link
          to="/#work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={16} />
          Back to Work
        </Link>
      </div>

      {/* 1. HERO SECTION */}
      <section className="container project-reveal" style={{ marginBottom: '60px' }}>

        {/* Concept Notice Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '20px', marginBottom: '20px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Design Concept</span>
        </div>

        <h1 style={{ fontSize: 'min(9vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '10px', marginBottom: '16px', letterSpacing: '-0.03em' }}>
          {project.title}
        </h1>

        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '700px', lineHeight: '1.4' }}>
          {project.conceptAim}
        </p>

      </section>

      {/* 2. visual layout section (Abstract CSS Visual Mockup) */}
      <section className="container project-reveal" style={{ marginBottom: '80px' }}>
        <div
          className="project-browser-container"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)',
            borderRadius: '32px',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-premium)'
          }}
        >
          {/* Backing patterns */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: 'linear-gradient(var(--border-medium) 1px, transparent 1px), linear-gradient(90deg, var(--border-medium) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Main Visual Frame (Browser Style) */}
          <div
            className="project-browser-frame"
            style={{
              width: '80%',
              height: '80%',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1
            }}
          >
            {/* Browser top tab bar */}
            <div style={{ height: '30px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
              <div style={{ margin: '0 auto', fontSize: '10px', color: 'var(--text-light)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                {project.title.toLowerCase().replace(/\s+/g, '-')}.concept
              </div>
            </div>

            {/* Browser content area mock */}
            <div className="browser-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '16px' }}>AS STUDIO</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--border-medium)', borderRadius: '2px' }} />
                  <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--border-medium)', borderRadius: '2px' }} />
                </div>
              </div>
              <div style={{ flex: 1, border: '1px dashed var(--border-medium)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                <Compass size={28} style={{ color: 'var(--accent)', animation: 'spin 20s infinite linear' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>CONCEPT INTERACTION BOUND</span>
              </div>
            </div>

          </div>

          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </section>

      {/* 3. CASE OVERVIEW & DETAILS */}
      <section className="container project-reveal project-details-grid" style={{ marginBottom: '80px' }}>

        {/* Left: Overview & Decisions */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>Concept Overview</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '40px' }}>
            {project.overview}
          </p>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px' }}>Key Design Decisions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {project.decisions.map((dec, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)', backgroundColor: 'var(--accent-light)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {idx + 1}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{dec.title}</h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{dec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Design Token Identity (Colors/Fonts) */}
        <div>
          <div className="glass-card project-info-card" style={{ border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '30px' }}>

            {/* Color swatches */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={16} /> Color Tokens
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {project.designSystems.colors.map((color, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: color, border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-sm)' }} />
                    <span style={{ fontSize: '10px', color: 'var(--text-light)', fontFamily: 'monospace' }}>{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography pairings */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} /> Font Pairings
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.designSystems.fonts.map((font, idx) => (
                  <div key={idx} style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {idx === 0 ? 'Heading: ' : 'Body: '}
                    <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontFamily: font === 'Satoshi' || font === 'Neue Montreal' || font === 'Clash Display' ? 'var(--font-heading)' : 'var(--font-body)' }}>{font}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structure outline */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Wireframe Structure
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.layoutStructure.map((struct, idx) => (
                  <div key={idx} style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--accent)' }}>↓</span>
                    <span>{struct}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 4. CALL TO ACTION */}
      <section className="container" style={{ padding: '60px 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="glass-card project-cta-card" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>Interested in a similar build?</h3>
          <p style={{ maxWidth: '460px', margin: '0 auto 24px', fontSize: '14px' }}>
            We can adapt these aesthetics to create an operational, premium custom portal for your business.
          </p>
          <button
            onClick={() => navigate('/#contact')}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '13px',
              backgroundColor: 'var(--text-primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 28px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--text-primary)'}
          >
            Start An Inquiry
            <ExternalLink size={14} />
          </button>
        </div>
      </section>

      {/* 5. OTHER PROJECTS */}
      <section className="container" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '80px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '30px', color: 'var(--text-primary)' }}>Explore Other Concepts</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '20px' }}>
          {relatedProjects.slice(0, 3).map((rel) => (
            <Link
              key={rel.id}
              to={`/projects/${rel.id}`}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'block',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -4, borderColor: 'var(--accent)', duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, borderColor: 'var(--glass-border)', duration: 0.3 });
              }}
            >
              <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>{rel.category}</span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {rel.title}
                <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
              </h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Styled utilities for ProjectPage responsiveness */}
      <style>{`
        .project-details-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
        }

        .project-info-card {
          padding: 40px;
        }

        .project-cta-card {
          padding: 60px 40px;
        }

        .project-browser-container {
          height: min(50vw, 500px);
        }

        .browser-content {
          padding: 30px;
          gap: 20px;
        }

        @media (max-width: 1023px) {
          .project-details-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .project-info-card {
            padding: 24px;
          }
          .project-cta-card {
            padding: 40px 20px;
          }
          .project-browser-container {
            height: 300px;
          }
          .browser-content {
            padding: 16px;
            gap: 12px;
          }
        }
      `}</style>

    </div>
  );
};
