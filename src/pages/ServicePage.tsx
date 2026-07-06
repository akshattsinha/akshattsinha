import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, HelpCircle, Check, Zap, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface ServiceData {
  title: string;
  tagline: string;
  overview: string;
  benefits: string[];
  whatsIncluded: string[];
  process: { step: string; desc: string }[];
  technologies: string[];
  faqs: { q: string; a: string }[];
}

export const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Custom data map for each service type
  const serviceDataMap: Record<string, ServiceData> = {
    'web-development': {
      title: 'Website Development',
      tagline: 'Engineered for Performance. Crafted for Identity.',
      overview: 'A premium website is more than an online brochure. It is the digital store front and operational hub of your business. I construct fast, clean, React-based websites structured for performance, search accessibility, and premium aesthetics.',
      benefits: [
        'Blazing Fast Load Times: Optimized static delivery ensuring instant page loads.',
        'High Conversions: Design layouts structured around user behaviors and goals.',
        'SEO-First Codebase: Compliant markup rendering that search crawlers reward.',
        'Mobile-Perfect Responsive: Smooth adaptations from massive displays to small phones.'
      ],
      whatsIncluded: [
        'Custom React & Next.js Coding',
        'Figma Design Transition & Auditing',
        'Lenis Smooth Scroll & GSAP Animations',
        'Performance Audits & Speed Tuning',
        'Responsive Testing Across Devices',
        'Analytics Setup (Google Analytics & Search Console)'
      ],
      process: [
        { step: 'Audit & Plan', desc: 'Analyzing current specs, benchmarks, competitors, and creating the stack map.' },
        { step: 'UI/UX Framing', desc: 'Structuring visual wireframes in Figma to refine details before coding.' },
        { step: 'Modern Code', desc: 'Writing clean modular React components with optimized assets.' },
        { step: 'Launch & Verify', desc: 'Configuring secure domains, hosting bundles, and running post-launch Lighthouse tests.' }
      ],
      technologies: ['HTML5', 'CSS3 / Variables', 'React', 'Next.js', 'Vite', 'GSAP', 'TypeScript', 'Vercel / Netlify'],
      faqs: [
        { q: 'How long does a website take to build?', a: 'Typically a premium custom marketing website takes between 3 to 6 weeks, depending on total page count and animation complexity.' },
        { q: 'Do you offer hosting setup?', a: 'Yes. I configure secure, low-latency static hosting on Vercel, Netlify, or AWS, and point custom domains for you.' }
      ]
    },
    'social-media': {
      title: 'Social Media Management',
      tagline: 'Visual Authority. Strategic Audience Growth.',
      overview: 'Establish an unforgettable presence on the feeds where your target market spends their day. I direct content design, visual theme consistency, and engagement schedules tailored to build long-term business equity.',
      benefits: [
        'Consistent Visual Theme: Feeds that communicate luxury and premium quality.',
        'Audience Engagement: Active interaction with relevant leads and pages.',
        'Structured Content Calendars: Clear, planned topics showing industry leadership.',
        'Growth Analytics: Monthly tracking of reach, follower counts, and link clicks.'
      ],
      whatsIncluded: [
        'Monthly Content Design Calendars',
        'Premium Grid & Story Graphic Design',
        'Sleek Reel & Video Covers',
        'Caption & Hashtag Strategy',
        'Lead Interaction & Community Engagement',
        'Monthly Growth Report Analyses'
      ],
      process: [
        { step: 'Vibe Audit', desc: 'Reviewing current pages, tone of voice, and competitor aesthetics.' },
        { step: 'Topic Strategy', desc: 'Developing core messaging pillars and monthly themes.' },
        { step: 'Production', desc: 'Creating premium visual layouts, slides, reels, and caption copy.' },
        { step: 'Analytics Review', desc: 'Tracking metrics to double down on high-performing formats.' }
      ],
      technologies: ['Figma', 'Photoshop', 'Illustrator', 'Premiere Pro', 'Buffer / Later', 'CapCut'],
      faqs: [
        { q: 'Which platforms do you manage?', a: 'I specialize in LinkedIn, Instagram, and X (Twitter) for premium brands and professional agencies.' },
        { q: 'Do you reply to DMs?', a: 'I monitor inbound inquiries and escalate hot leads to you, leaving detailed customer service answers to your team.' }
      ]
    },
    'branding': {
      title: 'Branding & Identity',
      tagline: 'Memorable Minimalism. Visual Sophistication.',
      overview: 'A premium brand identity tells a client who you are before they read a single line of text. I create visually cohesive brand identity sets (logos, colors, typography, assets) that express high-end value.',
      benefits: [
        'Visual Distinction: Unique styling that sets you apart from template-based competitors.',
        'High-End Typography: Curated fonts that communicate trust, luxury, or intelligence.',
        'Consistent Assets: Modular brand files for print, web, software, and apparel.',
        'Complete Design Systems: Precise color tokens, grid structures, and usage spacing.'
      ],
      whatsIncluded: [
        'Primary & Secondary Logo Designs',
        'Custom Curated Color Palette & Tokens',
        'Premium Font Pairing Selection',
        'Visual Identity Style Guide PDF',
        'Ready-to-Use Vector Export Packages',
        'Social Media Profile Templates'
      ],
      process: [
        { step: 'Moodboarding', desc: 'Curating typographic directions, competitor colors, and visual styles.' },
        { step: 'Concept Design', desc: 'Drafting 3 distinct vector options to explore structural options.' },
        { step: 'Refinement', desc: 'Polishing the chosen direction and building typography rules.' },
        { step: 'Delivery', desc: 'Packaging all scalable SVG/PNG assets and building the brand book.' }
      ],
      technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'SVG Editor'],
      faqs: [
        { q: 'Will I own the final logo designs?', a: 'Absolutely. You receive full commercial ownership rights and vector source files (.AI, .SVG) upon completion.' },
        { q: 'Can you update an existing logo?', a: 'Yes. I offer brand refreshes that preserve core visual equity while modernizing typography and colors.' }
      ]
    },
    'video-editing': {
      title: 'Video Editing',
      tagline: 'Cinematic Flow. Strategic Stagger. Retention Design.',
      overview: 'With shrinking attention spans, video editing is retention design. I assemble short-form reels, product advertisements, and explainer movies using cinematic cuts, typography overlays, and audio soundscapes.',
      benefits: [
        'High Hook Rates: Opening frames designed to stop scrolling loops.',
        'Rhythmic Narrative: Cuts and sounds matched for engaging pacing.',
        'Luxury Subtitles: Sleek, readable typographical overlays.',
        'Color Grading: Cinematic contrast, saturation, and exposure balancing.'
      ],
      whatsIncluded: [
        'Cinematic Short-Form Reel Assembly',
        'Promotional Product Advertisements',
        'Dynamic Text Animations & Subtitles',
        'Custom Sound Design & Sound Effects',
        'Color Correction & Aesthetic Grading',
        'Social Format Render Optimization (9:16, 16:9)'
      ],
      process: [
        { step: 'Footage Review', desc: 'Sorting clips, cataloging raw takes, and cleaning audio.' },
        { step: 'Pacing assembly', desc: 'Cutting the primary timeline flow to match background audio.' },
        { step: 'Visual layers', desc: 'Applying text annotations, motion effects, and color grading.' },
        { step: 'Final Polish', desc: 'Fine-tuning audio transitions, levels, and rendering export files.' }
      ],
      technologies: ['Adobe Premiere Pro', 'CapCut Pro', 'Adobe Photoshop', 'After Effects'],
      faqs: [
        { q: 'What is your typical turnaround time for a video?', a: 'Short-form videos (under 60s) are delivered within 48-72 hours. Longer videos depend on raw asset length and effects complexity.' },
        { q: 'How do we share raw footage?', a: 'We use secure cloud folders like Google Drive, Dropbox, or Frame.io to transfer high-resolution files.' }
      ]
    },
    'paid-advertising': {
      title: 'Paid Advertising',
      tagline: 'Data-Driven Acquisition. Premium Ad Assets.',
      overview: 'Advertising campaigns only succeed if the offer, copy, targeting, and landing page work in synergy. I configure, monitor, and optimize online ads to scale conversions, and design ad visuals that attract premium clients.',
      benefits: [
        'Laser Targeting: Reaching users based on exact buying intent or roles.',
        'A/B Testing: Split testing ad hooks, layouts, copy, and buttons.',
        'Transparent ROAS Tracking: Easy dashboards highlighting ad spend and revenue.',
        'High-Aesthetic Creatives: Ad banners and video hooks that elevate your brand.'
      ],
      whatsIncluded: [
        'Meta, Google & LinkedIn Ad Setup',
        'High-Converting Ad Copywriting',
        'Aesthetic Graphic & Video Creatives',
        'Audience Setup & Pixel Configuration',
        'Ongoing Bid & Budget Management',
        'A/B Testing Strategies & Reporting'
      ],
      process: [
        { step: 'Funnel Audit', desc: 'Reviewing current pages, conversion metrics, and offer pricing.' },
        { step: 'Creative Production', desc: 'Designing premium visual ads and persuasive hooks.' },
        { step: 'Campaign Launch', desc: 'Setting up lookalike audiences, pixels, and launching tests.' },
        { step: 'Scaling', desc: 'Reallocating budget to winning creatives and refining placements.' }
      ],
      technologies: ['Meta Ads Manager', 'Google Ads Manager', 'LinkedIn Campaign Manager', 'Google Analytics', 'Figma'],
      faqs: [
        { q: 'What is the recommended starting ad budget?', a: 'I recommend starting with at least $1,000/month in ad spend to ensure we gather enough conversion data to optimize.' },
        { q: 'Do you guarantee immediate sales?', a: 'I guarantee premium ad management and data tracking. Final conversions rely on your service quality, reviews, and sales response time.' }
      ]
    }
  };

  const service = id ? serviceDataMap[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <p style={{ marginBottom: '20px' }}>The requested service page does not exist.</p>
        <Link to="/" style={{ color: 'var(--accent)', fontWeight: 600 }}>Back to Homepage</Link>
      </div>
    );
  }

  // Get other services for related section
  const relatedServices = Object.keys(serviceDataMap)
    .filter(key => key !== id)
    .map(key => ({ id: key, title: serviceDataMap[key].title, tagline: serviceDataMap[key].tagline }));

  return (
    <div style={{ paddingBottom: '100px' }}>

      {/* Back to Home Navigation */}
      <div className="container" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Link
          to="/#services"
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
          Back to Services
        </Link>
      </div>

      {/* 1. HERO SECTION */}
      <section className="container service-reveal" style={{ marginBottom: '80px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Service Details</span>
        <h1 style={{ fontSize: 'min(9vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '10px', marginBottom: '16px', letterSpacing: '-0.03em' }}>
          {service.title}
        </h1>
        <h2 style={{ fontSize: 'min(5vw, 24px)', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '700px', lineHeight: '1.4' }}>
          {service.tagline}
        </h2>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-light)' }} />
      </section>

      {/* 2. OVERVIEW & BENEFITS */}
      <section className="container service-reveal service-overview-grid" style={{ marginBottom: '100px' }}>

        {/* Left Column Overview */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} style={{ color: 'var(--accent)' }} />
            Overview
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            {service.overview}
          </p>
        </div>

        {/* Right Column Benefits */}
        <div className="glass-card service-benefits-card" style={{ border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Key Values & Benefits</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {service.benefits.map((benefit, idx) => {
              const [bold, rest] = benefit.split(':');
              return (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Zap size={16} style={{ color: 'var(--accent)', marginTop: '4px', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{bold}:</strong>{rest}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* 3. WHAT'S INCLUDED & TECH STACK */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '80px 0' }}>
        <div className="container service-details-grid">

          {/* What's Included */}
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '30px', color: 'var(--text-primary)' }}>What's Included</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '20px' }}>
              {service.whatsIncluded.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)' }}>Toolkit Used</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '8px 16px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '20px',
                    color: 'var(--text-muted)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROCESS STEPS */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>Execution Workflow</h3>
          <p style={{ marginTop: '6px' }}>Our step-by-step roadmap from start to finish.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '30px' }}>
          {service.process.map((p, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '30px',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span style={{ position: 'absolute', top: '15px', right: '20px', fontSize: '36px', fontWeight: 200, color: 'var(--border-medium)', fontFamily: 'var(--font-heading)' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', marginTop: '10px' }}>
                {p.step}
              </h4>
              <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQs */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', marginBottom: '60px', color: 'var(--text-primary)' }}>Frequently Asked Questions</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card faq-card"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  display: 'flex',
                  gap: '16px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <HelpCircle size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{faq.q}</h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="container" style={{ padding: '100px 0 60px', textAlign: 'center' }}>
        <div className="glass-card service-cta-card" style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', boxShadow: 'var(--shadow-lg)', maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Let's build your {service.title.toLowerCase()} project
          </h3>
          <p style={{ maxWidth: '480px', margin: '0 auto 30px', fontSize: '15px' }}>
            Get in touch to schedule a quick discovery call. We'll outline your project targets and build a plan.
          </p>
          <button
            onClick={() => navigate('/#contact')}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '14px',
              backgroundColor: 'var(--text-primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 32px',
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
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* 7. RELATED SERVICES */}
      <section className="container" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '80px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '30px', color: 'var(--text-primary)' }}>Other Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '20px' }}>
          {relatedServices.slice(0, 3).map((rel) => (
            <Link
              key={rel.id}
              to={`/services/${rel.id}`}
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
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                {rel.title}
                <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
              </h4>
              <p style={{ fontSize: '12px', lineHeight: '1.4' }}>{rel.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Styled utilities for ServicePage responsiveness */}
      <style>{`
        .service-overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .service-benefits-card {
          padding: 40px;
        }

        .service-details-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
        }

        .faq-card {
          padding: 30px;
        }

        .service-cta-card {
          padding: 60px 40px;
        }

        @media (max-width: 1023px) {
          .service-overview-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .service-details-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .service-benefits-card {
            padding: 24px;
          }
          .faq-card {
            padding: 20px;
          }
          .service-cta-card {
            padding: 40px 20px;
          }
        }
      `}</style>

    </div>
  );
};
