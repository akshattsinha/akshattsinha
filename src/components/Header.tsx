import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for header contraction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu panel
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      // Stagger items
      gsap.fromTo(
        '.mobile-nav-link',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(menuRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.6,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  const navLinks = [
    { label: 'Services', path: '/#services' },
    { label: 'About', path: '/#about' },
    { label: 'Journal', path: '/journal' },
  ];

  const handleNavLinkClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const targetId = path.split('#')[1];
      if (location.pathname === '/') {
        // Smooth scroll directly if already on Home
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate home first, then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  // Magnetic button hover effect
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
    e.currentTarget.style.backgroundColor = 'var(--text-primary)';
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: 'fixed',
          top: scrolled ? '20px' : '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 80px)',
          maxWidth: '1320px',
          zIndex: 9990,
          transition: 'var(--transition-smooth)',
        }}
      >
        <div
          className="glass-card"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: scrolled ? '12px 32px' : '20px 40px',
            borderRadius: '50px',
            transition: 'var(--transition-smooth)',
            border: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0,0,0,0.03)',
            background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.45)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '20px',
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

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-menu"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavLinkClick(link.path)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  const dot = e.currentTarget.querySelector('.nav-dot');
                  if (dot) gsap.to(dot, { scaleX: 1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  const dot = e.currentTarget.querySelector('.nav-dot');
                  if (dot) gsap.to(dot, { scaleX: 0, duration: 0.3 });
                }}
              >
                {link.label}
                <span
                  className="nav-dot"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1.5px',
                    backgroundColor: 'var(--accent)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div style={{ display: 'none', alignItems: 'center' }} className="desktop-menu">
            <button
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              onClick={() => handleNavLinkClick('/#contact')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '13px',
                color: '#FFFFFF',
                backgroundColor: 'var(--text-primary)',
                border: 'none',
                borderRadius: '24px',
                padding: '10px 24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.3s ease, transform 0.1s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
              }}
            >
              Let's Talk
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '4px',
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          backgroundColor: '#FFFFFF',
          zIndex: 9980,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 40px',
        }}
      >
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          {navLinks.map((link) => (
            <div key={link.label} className="reveal-text">
              <button
                className="mobile-nav-link"
                onClick={() => handleNavLinkClick(link.path)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'min(10vw, 50px)',
                  color: 'var(--text-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  letterSpacing: '-0.02em',
                }}
              >
                {link.label}
              </button>
            </div>
          ))}
          <div className="reveal-text">
            <button
              className="mobile-nav-link"
              onClick={() => handleNavLinkClick('/#contact')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'min(10vw, 50px)',
                color: 'var(--accent)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              Let's Talk
              <ArrowUpRight size={36} />
            </button>
          </div>
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '0px' }}>GET IN TOUCH</p>
            <a href="mailto:sinhaakshat01@gmail.com" style={{ fontSize: '14px', fontWeight: 500, textDecoration: 'none', color: 'var(--text-primary)' }}>sinhaakshat01@gmail.com</a>
            <a href="tel:+918541900698" style={{ fontSize: '14px', fontWeight: 500, textDecoration: 'none', color: 'var(--text-primary)' }}>+91 85419 00698</a>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <a href="https://www.linkedin.com/in/akshattsinha/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>LN</a>
            <a href="https://github.com/akshattsinha" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>GH</a>
            <a href="https://www.instagram.com/akshattsinha/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>IG</a>
          </div>
        </div>
      </div>

      {/* Media query styling injection */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          header {
            width: calc(100% - 30px) !important;
            top: 15px !important;
          }
          header > div {
            padding: 10px 20px !important;
          }
        }
      `}</style>
    </>
  );
};
