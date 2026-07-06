import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Calendar } from 'lucide-react';

interface ArticleDetail {
  title: string;
  category: string;
  date: string;
  readTime: string;
  introduction: string;
  paragraphs: string[];
  quote?: string;
  conclusion: string;
}

export const JournalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Full article detail mapping
  const articleMap: Record<string, ArticleDetail> = {
    'why-every-business-needs-a-premium-website': {
      title: 'Why Every Business Needs a Premium Website',
      category: 'Business / Digital Strategy',
      date: 'June 28, 2026',
      readTime: '5 min read',
      introduction: 'In a digital-first marketplace, your website acts as your primary brand representative. Standard templates do not convey custom quality; they communicate standard boundaries. A premium custom website, by contrast, highlights attention to detail and craftsmanship.',
      paragraphs: [
        'A generic website template tells visitors that you settle for shortcuts. If your digital footprint looks identical to a hundred others in your niche, you have commoditized your business before potential customers even read your value proposition. Crafting an exclusive website changes the conversation. It tells clients, "If this is how we present ourselves, imagine what we can build for your business."',
        'Custom interactive elements, smooth GSAP transition timelines, and Lenis scrolling filters are not mere decoration. They are tools of user engagement. Modern research proves that consumers associate smooth visual performance and fast layout responses with premium operational efficiency in the real world.',
        'Additionally, templates carry massive CSS payloads and bloated framework extensions that drag down loading times. High-end bespoke sites are built on clean code architectures, loading immediately, ranking higher on organic SEO search sweeps, and retaining mobile users.'
      ],
      quote: 'A premium website does not cost money; it generates equity. It communicates trust before a user clicks a single contact form input.',
      conclusion: 'If you want to command high-end commercial values, your digital footprint must reflect that same standard. Invest in custom engineering to elevate your online reputation.'
    },
    'my-website-design-process': {
      title: 'My Website Design Process Unveiled',
      category: 'Design Systems / UX',
      date: 'June 15, 2026',
      readTime: '7 min read',
      introduction: 'Bespoke design is not about guessing; it is about execution. My design process moves methodically from research grids all the way to final optimized React codeblocks.',
      paragraphs: [
        'First, we discover. We define brand goals, target customers, competitor weaknesses, and color token configurations. We compile these details into a high-level digital moodboard to set stylistic expectations.',
        'Next, we translate moodboards into Figma wireframe layouts. This step centers strictly on information hierarchies and interactive paths, ensuring users can find services and submit inquiries without friction.',
        'Finally, we enter development. I write modular, clean React source code with typescript security. I add custom GSAP scroll triggers and verify layout speeds against Google Lighthouse benchmarks before launch.'
      ],
      quote: 'A layout is only complete when nothing can be removed without breaking the core communication path.',
      conclusion: 'Methodical preparation guarantees that the final delivered site matches both visual aesthetics and functional performance targets.'
    },
    'creating-better-user-experiences': {
      title: 'Creating Better User Experiences in 2026',
      category: 'Interaction Design',
      date: 'May 30, 2026',
      readTime: '6 min read',
      introduction: 'User experience goes beyond clean shapes. In 2026, premium user experiences are defined by speed, responsiveness, subtle animation layers, and accessibility.',
      paragraphs: [
        'A static layout feels unresponsive. In contrast, incorporating subtle mouse-follow tilts, micro-reflection lines on button hovers, and clean loading animations makes pages feel alive and responsive.',
        'Motion should always serve a purpose. Adding heavy fly-ins that trigger layout shifts degrades rendering speeds and annoys readers. Instead, use GSAP ScrollTriggers to gradually reveal text and translate grids as the user scrolls, matching their reading speed.',
        'Finally, do not compromise on speed. An animation that delays interactive availability is a bad experience. Keep animations under 400ms and leverage hardware-accelerated CSS properties to ensure high frame rates.'
      ],
      quote: 'Motion should guide attention, not demand it. The best design animations are felt rather than noticed.',
      conclusion: 'By prioritizing speed and intentional motion design, you create web interfaces that engage users and build visual brand loyalty.'
    },
    'modern-ui-trends': {
      title: 'Modern UI Trends: Exclusivity and Minimal Grids',
      category: 'UI Design Trends',
      date: 'May 12, 2026',
      readTime: '4 min read',
      introduction: 'Digital styling undergoes rapid shifts, but the luxury aesthetic remains constant: clarity, fine lines, plenty of whitespace, and high typography hierarchies.',
      paragraphs: [
        'Look at Apple, Linear, or Framer. They share a specific visual style: massive contrast headings, crisp light gray backgrounds, glassmorphic headers, and very subtle border lines. This layout guides readability and communicates high-value organization.',
        'We also see the return of organic typography pairings. Mixing geometric sans-serif body text (like Inter) with bold display fonts (like Syne) adds human character back to modern interfaces.',
        'Ultimately, premium design is about restraint. It is about knowing which elements to exclude to ensure that the core visual focal points remain unforgettable.'
      ],
      quote: 'Simplicity is not the starting point; it is the final milestone of careful design editing.',
      conclusion: 'Adopt minimal grids and high typography hierarchies to give your next design project a premium, state-of-the-art aesthetic.'
    },
    'seo-basics': {
      title: 'SEO Basics for Modern Web Apps',
      category: 'Search Engine Optimization',
      date: 'April 25, 2026',
      readTime: '8 min read',
      introduction: 'Beautiful design is useless if no one can find it. Modern single-page applications require specific SEO architectures to rank highly on search engines.',
      paragraphs: [
        'Search crawlers reward fast pages with semantic HTML. Ensure that your React code uses header tags (H1, H2, H3) logically, rather than styling generic divs. Crawlers read structure, not visual style.',
        'Speed is a ranking factor. Compressing images, lazy-loading heavy off-screen elements, and keeping JavaScript bundles clean directly improves search engine indexing rankings.',
        'Finally, utilize schema markup. Adding JSON-LD structures to describe your business type and services provides search engines with clear indexing cues, increasing rich-snippet occurrences.'
      ],
      quote: 'SEO is not about tricking algorithms; it is about building clean layouts that search bots can easily read.',
      conclusion: 'Ensure semantic structure and fast loading times from day one to guarantee high search visibility.'
    }
  };

  const article = id ? articleMap[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <p style={{ marginBottom: '20px' }}>The requested journal article does not exist.</p>
        <Link to="/journal" style={{ color: 'var(--accent)', fontWeight: 600 }}>Back to Journal</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px' }}>

      {/* Back to List */}
      <div className="container" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Link
          to="/journal"
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
          Back to Journal
        </Link>
      </div>

      {/* 1. ARTICLE HERO */}
      <section className="container article-reveal" style={{ maxWidth: '720px', marginBottom: '50px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {article.category}
        </span>

        <h1 style={{ fontSize: 'min(9vw, 48px)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '14px', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'var(--text-light)', fontSize: '13px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} />
            <span>{article.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} />
            <span>By Akshat Sinha</span>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT (Centered Reading Block) */}
      <section className="container article-reveal" style={{ maxWidth: '720px' }}>

        {/* Intro */}
        <p style={{ fontSize: '18px', fontWeight: 500, lineHeight: '1.7', color: 'var(--text-primary)', marginBottom: '30px' }}>
          {article.introduction}
        </p>

        {/* Paragraphs */}
        {article.paragraphs.map((p, idx) => (
          <p key={idx} style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '24px' }}>
            {p}
          </p>
        ))}

        {/* Quote Callout */}
        {article.quote && (
          <blockquote
            style={{
              margin: '40px 0',
              padding: '30px 40px',
              borderLeft: '4px solid var(--accent)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '0 16px 16px 0',
              fontStyle: 'italic',
              fontSize: '18px',
              color: 'var(--text-primary)',
              lineHeight: '1.6',
              fontWeight: 500
            }}
          >
            "{article.quote}"
          </blockquote>
        )}

        {/* Conclusion */}
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '40px' }}>
          {article.conclusion}
        </p>

        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-light)', margin: '60px 0' }} />

        {/* Bottom CTA / Author block */}
        <div className="glass-card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid var(--border-light)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px' }}>
            AS
          </div>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Written by Akshat Sinha</h4>
            <p style={{ fontSize: '13px', lineHeight: '1.4' }}>
              Bespoke digital designer and developer building luxury web experiences.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
};
