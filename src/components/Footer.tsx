import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Magnetic button hover effect
  const handleSocialMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleSocialMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
    e.currentTarget.style.borderColor = 'var(--border-light)';
    e.currentTarget.style.color = 'var(--text-primary)';
  };

  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', padding: '100px 0 60px' }}>
      <div className="container">
        {/* Top footer grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '80px' }}>
          
          {/* Logo & Slogan Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link 
              to="/" 
              onClick={handleScrollToTop}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '24px',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              AS
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
            </Link>
            <p style={{ fontSize: '14px', lineHeight: '1.6', maxWidth: '280px', color: 'var(--text-muted)' }}>
              Designing and building premium digital experiences that help businesses grow and stand out.
            </p>
          </div>

          {/* Quick links Column */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/#services" style={{ fontSize: '14px', color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--accent)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-muted)'}>My Services</Link>
              <Link to="/#about" style={{ fontSize: '14px', color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--accent)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-muted)'}>About Me</Link>
              <Link to="/journal" style={{ fontSize: '14px', color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--accent)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-muted)'}>Journal (Blog)</Link>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="mailto:sinhaakshat01@gmail.com" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                sinhaakshat01@gmail.com
                <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
              </a>
              <a href="tel:+918541900698" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                +91 85419 00698
                <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
              </a>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Open for new projects and consulting inquiries.
              </p>
            </div>
          </div>

          {/* Socials Column */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Socials
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { 
                  label: 'LinkedIn', 
                  url: 'https://www.linkedin.com/in/akshattsinha/', 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none">
                      <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  ) 
                },
                { 
                  label: 'GitHub', 
                  url: 'https://github.com/akshattsinha/akshattsinha', 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none">
                      <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  ) 
                },
                { 
                  label: 'Instagram', 
                  url: 'https://www.instagram.com/akshattsinha/', 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none">
                      <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  ) 
                }
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={handleSocialMouseMove}
                  onMouseLeave={handleSocialMouseLeave}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)',
                    transition: 'border-color 0.3s, color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '40px', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>
              © {currentYear} Akshat Sinha. All rights reserved.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>
              Designed & Developed by <span style={{ color: 'var(--text-primary)' }}>Akshat Sinha</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
