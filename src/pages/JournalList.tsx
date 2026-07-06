import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface ArticleSummary {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
}

export const JournalList: React.FC = () => {
  const navigate = useNavigate();

  const articles: ArticleSummary[] = [
    {
      id: 'why-every-business-needs-a-premium-website',
      title: 'Why Every Business Needs a Premium Website',
      category: 'Business / Digital Strategy',
      date: 'June 28, 2026',
      readTime: '5 min read',
      summary: 'In the digital era, your website is your brand’s first impression. Templates convey generic value. Custom premium engineering communicates unmatched craftsmanship and trust.'
    },
    {
      id: 'my-website-design-process',
      title: 'My Website Design Process Unveiled',
      category: 'Design Systems / UX',
      date: 'June 15, 2026',
      readTime: '7 min read',
      summary: 'A look into how I take ideas from discover workshops, through Figma prototypes, all the way to pixel-perfect live React applications.'
    },
    {
      id: 'creating-better-user-experiences',
      title: 'Creating Better User Experiences in 2026',
      category: 'Interaction Design',
      date: 'May 30, 2026',
      readTime: '6 min read',
      summary: 'Why performance, motion design (GSAP, Lenis), and clean layout alignment matter. We break down the differences between simple pages and luxurious web applications.'
    },
    {
      id: 'modern-ui-trends',
      title: 'Modern UI Trends: Exclusivity and Minimal Grids',
      category: 'UI Design Trends',
      date: 'May 12, 2026',
      readTime: '4 min read',
      summary: 'Exploring the typography details, glassmorphism filters, and clean micro-shadow systems used by Apple, Linear, and modern Awwwards products.'
    },
    {
      id: 'seo-basics',
      title: 'SEO Basics for Modern Web Apps',
      category: 'Search Engine Optimization',
      date: 'April 25, 2026',
      readTime: '8 min read',
      summary: 'How modern semantic DOM structures, speed optimization, and dynamic metadata layouts help single-page applications rank first on Google.'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingBottom: '100px' }}>

      {/* Back to Home Navigation */}
      <div className="container" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Link
          to="/"
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
          Back to Portfolio
        </Link>
      </div>

      {/* 1. HERO SECTION */}
      <section className="container journal-reveal" style={{ marginBottom: '80px', maxWidth: '800px', textAlign: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Thoughts & Strategy</span>
        <h1 style={{ fontSize: 'min(9vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '10px', marginBottom: '16px', letterSpacing: '-0.03em' }}>
          The Journal
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          An online magazine discussing user experience architecture, design decisions, paid acquisition, and digital craft.
        </p>
      </section>

      {/* 2. ARTICLES FEED GRID */}
      <section className="container journal-reveal" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => navigate(`/journal/${art.id}`)}
              className="glass-card"
              style={{
                padding: '40px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -6, borderColor: 'var(--accent)', duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, borderColor: 'var(--glass-border)', duration: 0.3 });
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {art.category}
                </span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px', color: 'var(--text-light)' }}>
                  <span>{art.date}</span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--border-medium)' }} />
                  <span>{art.readTime}</span>
                </div>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {art.title}
                <ArrowUpRight size={20} style={{ color: 'var(--text-light)', flexShrink: 0, marginLeft: '16px' }} />
              </h2>

              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                {art.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
