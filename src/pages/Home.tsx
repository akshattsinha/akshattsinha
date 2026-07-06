import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight, ArrowUpRight, Code, Palette,
  Video, BarChart3, TrendingUp, Layers, CheckCircle2,
  ChevronRight, Send, Check
} from 'lucide-react';
import portraitImg from '../assets/portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

// Google Sheets Integration: Create and deploy a Google Apps Script Web App from your Spreadsheet,
// then paste the deployed Web App URL below (e.g. 'https://script.google.com/macros/s/.../exec')
const GOOGLE_SHEETS_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbzbroWj1XwCUFZnpyE4iyBmVfwZbulgImDUARSvovH646M1TF7XrLa4v7-Hwv33yit4cA/exec';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Section refs for GSAP ScrollTriggers
  const heroRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const whyMeRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const toolkitRef = useRef<HTMLElement>(null);
  const inquiryRef = useRef<HTMLElement>(null);

  // Form State
  const [inquiryStep, setInquiryStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    countryCode: '+91',
    phone: '',
    service: 'Website Development',
    timeline: '1-2 Months',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Custom 3D Tilt for Hero Portrait
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 800,
      ease: 'power2.out',
      duration: 0.5
    });

    // Move floating UI elements inside slightly faster for parallax depth
    const floaters = card.querySelectorAll('.float-ui');
    floaters.forEach((floater, idx) => {
      const depth = (idx + 1) * 10;
      const moveX = ((x / rect.width) - 0.5) * depth;
      const moveY = ((y / rect.height) - 0.5) * depth;
      gsap.to(floater, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
  };

  const handlePortraitMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.8
    });
    const floaters = e.currentTarget.querySelectorAll('.float-ui');
    floaters.forEach((floater) => {
      gsap.to(floater, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  };

  // GSAP Animations
  useGSAP(() => {
    // 1. Hero Reveal Animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero-small-text', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from('.hero-title-line', { y: 80, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power4.out' }, '-=0.4')
      .from('.hero-tagline', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-btn-group', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-portrait-wrap', { scale: 0.95, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8')
      .from('.hero-backdrop-text', { opacity: 0, scale: 0.9, duration: 1.5, ease: 'power3.out' }, '-=1.2');

    // 2. Scroll Storytelling Transition (Zoom out portrait + transform background)
    gsap.timeline({
      scrollTrigger: {
        trigger: '#transition-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })
      .fromTo('.transition-text-reveal',
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out' }
      );

    // 4. Stagger reveal value cards (Why me)
    gsap.fromTo('.value-card',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    // 5. Scroll-linked Timeline Animation
    const timelineItems = gsap.utils.toArray('.timeline-item');
    timelineItems.forEach((item: any) => {
      gsap.fromTo(item,
        { x: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
      // Animate line connection
      const line = item.querySelector('.timeline-line-fill');
      if (line) {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom 60%',
              scrub: true
            }
          }
        );
      }
    });

    // 6. Featured Concepts Grid Reveal
    gsap.fromTo('.concept-grid-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#work',
          start: 'top bottom',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );

    // 7. Toolkit Stagger
    gsap.fromTo('.toolkit-icon-card',
      { scale: 0.8, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#toolkit-section',
          start: 'top bottom',
        },
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      }
    );

    // Force ScrollTrigger refresh to update coordinates after render
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: containerRef });

  // Handle Form Change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      let formatted = digitsOnly;
      if (digitsOnly.length > 5) {
        const cleanDigits = digitsOnly.slice(0, 15); // Limit to max 15 digits for international compatibility
        formatted = `${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5)}`;
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryStep < 3) {
      setInquiryStep(prev => prev + 1);
    } else {
      setFormSubmitting(true);
      try {
        // Post data to Google Sheets via Apps Script Web App
        if (GOOGLE_SHEETS_SCRIPT_URL && GOOGLE_SHEETS_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
          await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Bypass CORS preflight issues with Apps Script redirects
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name,
              company: formData.company,
              email: formData.email,
              phone: `'${formData.countryCode} ${formData.phone}`,
              service: formData.service,
              timeline: formData.timeline,
              message: formData.message
            })
          });
        } else {
          console.warn('Google Sheets Web App URL is not configured. Please set GOOGLE_SHEETS_SCRIPT_URL.');
        }
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting form to Google Sheets:', error);
        // Fallback: Proceed visually so user interaction is not blocked
        setFormSubmitted(true);
      } finally {
        setFormSubmitting(false);
      }
    }
  };

  const services = [
    { id: 'web-development', title: 'Website Development', icon: <Code size={24} />, desc: 'High-end, performance-driven web products built on modern architectures (React, Next.js, Vite).' },
    { id: 'social-media', title: 'Social Media Management', icon: <TrendingUp size={24} />, desc: 'Custom content creation, platform strategy, and engagement plans to grow your audience.' },
    { id: 'branding', title: 'Branding & Identity', icon: <Palette size={24} />, desc: 'Minimal, upscale design styles including logos, typography, visual style guidelines, and design tokens.' },
    { id: 'video-editing', title: 'Video Editing', icon: <Video size={24} />, desc: 'Cinema-grade storytelling and micro-animations optimized for social feeds, marketing, and products.' },
    { id: 'paid-advertising', title: 'Paid Advertising', icon: <BarChart3 size={24} />, desc: 'Data-guided campaigns on Meta, Google, and LinkedIn that maximize returns and customer acquisition.' },
  ];

  const values = [
    { title: 'Premium Aesthetics', desc: 'Inspired by Apple, Linear, and modern high-end visual styles.' },
    { title: 'Results Driven', desc: 'Optimized to maximize conversions, views, speed, or engagement.' },
    { title: 'High Visibility', desc: 'Structured to satisfy search engines, platform algorithms, and target audiences.' },
    { title: 'Multi-Platform', desc: 'Flawless rendering and layout fits across all devices and social feeds.' },
    { title: 'Attention to Detail', desc: 'Meticulous grid alignments, curated typography, and high-fidelity finishes.' },
    { title: 'Fast Communication', desc: 'Direct, clear updates via Slack, WhatsApp, or email.' },
    { title: 'Transparent Process', desc: 'Realtime access to design files, project assets, and staging environments.' },
    { title: 'Strategic Approach', desc: 'Finding elegant creative directions, shortcuts, and campaign solutions.' },
  ];

  const timelineSteps = [
    { title: 'Discover', desc: 'We jump on a call to unpack your vision, target customer, brand tone, and creative requirements.' },
    { title: 'Research', desc: 'Competitor studies, target audience behavior, styling trends, and creative directions.' },
    { title: 'Strategy', desc: 'Finalizing content outlines, distribution channels, user flows, and campaign goals.' },
    { title: 'Design & Concept', desc: 'High-fidelity wireframes, visual style guides, storyboard layouts, or prototypes.' },
    { title: 'Production', desc: 'Executing high-end development, high-fidelity video editing, campaign setups, or content creation.' },
    { title: 'Refinement', desc: 'Thorough quality assurance, render exports, performance testing, and responsive audits.' },
    { title: 'Launch & Delivery', desc: 'Deploying web builds, launching live ad campaigns, publishing content, and sharing assets.' },
  ];



  const toolkit = [
    { name: 'HTML5', level: 'Expert' }, { name: 'CSS3', level: 'Expert' }, { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Expert' }, { name: 'Next.js', level: 'Advanced' }, { name: 'Node.js', level: 'Intermediate' },
    { name: 'Figma', level: 'Expert' }, { name: 'Photoshop', level: 'Advanced' }, { name: 'Illustrator', level: 'Advanced' },
    { name: 'Premiere Pro', level: 'Advanced' }, { name: 'GitHub', level: 'Advanced' }, { name: 'VS Code', level: 'Expert' }
  ];

  const journalArticles = [
    { id: 'why-every-business-needs-a-premium-website', title: 'Why Every Business Needs a Premium Website', date: 'June 28, 2026', readTime: '5 min read' },
    { id: 'my-website-design-process', title: 'My Website Design Process Unveiled', date: 'June 15, 2026', readTime: '7 min read' },
    { id: 'creating-better-user-experiences', title: 'Creating Better User Experiences in 2026', date: 'May 30, 2026', readTime: '6 min read' }
  ];

  const handleCardExpand = (id: string) => {
    navigate(`/services/${id}`);
  };

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        style={{
          minHeight: 'calc(100vh - 100px)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingBottom: '60px'
        }}
      >
        <div className="container hero-grid">

          {/* Left Text Column */}
          <div style={{ zIndex: 2 }}>
            <span
              className="hero-small-text"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              Hello, I'm
            </span>

            <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'min(10vw, 84px)',
                  lineHeight: '0.95',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-primary)',
                }}
              >
                <div className="hero-title-line">AKSHAT</div>
                <div className="hero-title-line" style={{ color: 'transparent', WebkitTextStroke: '1px var(--text-primary)' }}>SINHA</div>
              </h1>
            </div>

            <h2
              className="hero-tagline"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'min(5vw, 28px)',
                lineHeight: '1.3',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                maxWidth: '600px'
              }}
            >
              Designing Premium Digital Experiences That Help Businesses Grow.
            </h2>

            <p
              className="hero-desc"
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--text-muted)',
                marginBottom: '40px',
                maxWidth: '540px'
              }}
            >
              I design and build high-quality websites, manage social media, create engaging content, and help businesses establish a powerful online presence.
            </p>

            {/* CTAs */}
            <div className="hero-btn-group" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '14px',
                  backgroundColor: 'var(--text-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '16px 36px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--text-primary)'}
              >
                Let's Talk
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Portrait & Visual Column */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>

            {/* Background Big Text */}
            <div
              className="hero-backdrop-text"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '18vw',
                fontWeight: 900,
                color: 'rgba(0, 0, 0, 0.025)',
                fontFamily: 'var(--font-display)',
                pointerEvents: 'none',
                zIndex: 0,
                userSelect: 'none'
              }}
            >
              AKSHAT
            </div>

            {/* Glow backing */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(124, 92, 252, 0.15) 0%, rgba(255, 255, 255, 0) 65%)',
                filter: 'blur(30px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            {/* 3D Tilt Wrapper */}
            <div
              className="hero-portrait-wrap"
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
              style={{
                position: 'relative',
                width: 'min(90vw, 420px)',
                height: 'min(110vw, 480px)',
                borderRadius: '32px',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                zIndex: 1,
              }}
            >
              {/* Main Portrait Card */}
              <div
                className="glass-card"
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '32px',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: 'var(--shadow-premium)',
                  position: 'relative',
                }}
              >
                <img
                  src={portraitImg}
                  alt="Akshat Sinha"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>

              {/* Floating UI Card 1 (Analytics) */}
              <div
                className="glass-card float-ui float-ui-analytics"
                style={{
                  position: 'absolute',
                  top: '15%',
                  left: '-20px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transform: 'translateZ(40px)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', padding: '8px', borderRadius: '10px' }}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>Conversion</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.2' }}>+142%</div>
                </div>
              </div>

              {/* Floating UI Card 2 (Device Mockup) */}
              <div
                className="glass-card float-ui float-ui-mockup"
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  right: '-30px',
                  padding: '16px',
                  borderRadius: '20px',
                  transform: 'translateZ(50px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                </div>
                <div style={{ width: '130px', height: '60px', borderRadius: '8px', background: 'linear-gradient(135deg, #7C5CFC 0%, #B496FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={20} style={{ color: '#FFFFFF' }} />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Animated scroll down indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-light)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          <span>Scroll</span>
          <div style={{ width: '2px', height: '30px', backgroundColor: 'var(--border-medium)', borderRadius: '1px', overflow: 'hidden', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--accent)',
                transformOrigin: 'top center',
                animation: 'scrollIndicatorAnim 2s infinite cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>
        </div>

      </section>

      {/* 2. SCROLL TRANSITION SECTION */}
      <section
        ref={transitionRef}
        id="transition-section"
        style={{
          height: '70dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-secondary)',
          position: 'relative',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            className="transition-text-reveal"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'min(7vw, 42px)',
              fontWeight: 700,
              lineHeight: '1.3',
              maxWidth: '900px',
              margin: '0 auto',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}
          >
            "Every great business deserves an unforgettable digital presence."
          </h2>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section
        ref={servicesRef}
        id="services"
        className="section-padding"
      >
        <div className="container">
          <div style={{ maxWidth: '600px', marginBottom: '60px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Services</span>
            <h2 style={{ fontSize: 'min(8vw, 48px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Premium digital crafts to scale your project.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(290px, 100%), 1fr))', gap: '30px' }}>
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardExpand(service.id)}
                className={`glass-card service-card card-expander-${service.id}`}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '280px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Icon & Title */}
                <div>
                  <div style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-light)', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                    {service.desc}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-fast)'
                    }}
                    className="service-arrow"
                  >
                    <ChevronRight size={18} />
                  </div>
                </div>

                {/* Glass reflection animation overlays */}
                <div
                  className="card-reflection"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'skewX(-25deg)',
                    transition: '0.75s'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY WORK WITH ME SECTION */}
      <section
        ref={whyMeRef}
        id="about"
        style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}
        className="section-padding"
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Values</span>
            <h2 style={{ fontSize: 'min(8vw, 42px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Why Work With Me
            </h2>
            <p style={{ marginTop: '10px' }}>Guiding principles that guarantee state-of-the-art results for every client.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '30px' }}>
            {values.map((val, idx) => (
              <div
                key={idx}
                className="value-card"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <CheckCircle2 size={22} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{val.title}</h4>
                  <p style={{ fontSize: '13px', lineHeight: '1.5' }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MY PROCESS TIMELINE */}
      <section
        ref={timelineRef}
        className="section-padding"
      >
        <div className="container">
          <div style={{ maxWidth: '600px', marginBottom: '80px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Methodology</span>
            <h2 style={{ fontSize: 'min(8vw, 48px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              The Production Process
            </h2>
          </div>

          <div style={{ position: 'relative', paddingLeft: '40px', maxWidth: '800px', margin: '0 auto' }}>

            {/* Timeline vertical bar */}
            <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-light)' }} />

            {timelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="timeline-item"
                style={{
                  position: 'relative',
                  marginBottom: '60px',
                }}
              >
                {/* Timeline Dot Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '2px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    marginLeft: '1px'
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                </div>

                {/* Timeline active line fill */}
                {idx < timelineSteps.length - 1 && (
                  <div
                    className="timeline-line-fill"
                    style={{
                      position: 'absolute',
                      left: '-30px',
                      top: '26px',
                      width: '2px',
                      height: 'calc(100% + 40px)',
                      backgroundColor: 'var(--accent)',
                      zIndex: 1,
                      transform: 'scaleY(0)'
                    }}
                  />
                )}

                {/* Timeline content details */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: '20px' }}>
                  <span style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', fontWeight: 300, color: 'var(--border-medium)', lineHeight: '1.1' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>



      {/* 7. DESIGN PHILOSOPHY */}
      <section
        style={{
          padding: '160px 0',
          position: 'relative'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Philosophy</span>
          <h2
            style={{
              fontSize: 'min(7vw, 44px)',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              lineHeight: '1.3',
              color: 'var(--text-primary)',
              marginTop: '20px',
              marginBottom: '30px',
              letterSpacing: '-0.03em'
            }}
          >
            "Good design is not decoration. It is communication. Every animation. Every interaction. Every pixel. Every detail. Should have a purpose."
          </h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)', margin: '0 auto' }} />
        </div>
      </section>

      {/* 8. MY TOOLKIT */}
      <section
        ref={toolkitRef}
        id="toolkit-section"
        style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}
        className="section-padding"
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Expertise</span>
            <h2 style={{ fontSize: 'min(8vw, 42px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              My Toolkit
            </h2>
            <p style={{ marginTop: '10px' }}>Tech stacks and design applications I specialize in to build premium solutions.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
              gap: '24px',
              maxWidth: '960px',
              margin: '0 auto'
            }}
          >
            {toolkit.map((item, idx) => (
              <div
                key={idx}
                className="glass-card toolkit-icon-card"
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { y: -8, borderColor: 'var(--accent)', scale: 1.02, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { y: 0, borderColor: 'var(--glass-border)', scale: 1, duration: 0.3 });
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
                  {item.name.charAt(0)}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</h4>
                <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: 500, textTransform: 'uppercase' }}>{item.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BEHIND THE SCENES */}
      <section className="section-padding">
        <div className="container">
          <div className="bts-grid">

            {/* Left Column Description */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Workflow</span>
              <h2 style={{ fontSize: 'min(8vw, 42px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Behind The Scenes
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '30px' }}>
                Crafting luxury digital spaces is a comprehensive discipline. From paper sketch concepts to structured code wireframes, I build prototypes that allow interactive feedback before final shipping.
              </p>

              {/* Staggered process checkmarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {['Paper Sketches & Concepts', 'Wireframing & Structural Maps', 'High-Fidelity Figma Prototypes', 'Responsive Development & Testing'].map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Abstract Floating Screens */}
            <div style={{ height: '400px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Back Card (Wireframe) */}
              <div
                className="glass-card hover-scale bts-card-wireframe"
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '180px',
                  left: '10%',
                  top: '15%',
                  padding: '20px',
                  borderRadius: '16px',
                  transform: 'rotate(-5deg)',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 1
                }}
              >
                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-medium)' }} />
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-medium)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ height: '10px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', width: '80%' }} />
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', width: '50%' }} />
                  <div style={{ height: '30px', border: '1px dashed var(--border-medium)', borderRadius: '6px', marginTop: '10px' }} />
                </div>
              </div>

              {/* Front Card (Code) */}
              <div
                className="glass-card hover-scale bts-card-code"
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '200px',
                  right: '10%',
                  bottom: '15%',
                  padding: '24px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--text-primary)',
                  color: '#FFFFFF',
                  transform: 'rotate(3deg)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                </div>
                <code style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'rgba(255,255,255,0.8)', padding: 0, background: 'none' }}>
                  <div style={{ color: '#7C5CFC' }}>const portfolio = () =&gt; &#123;</div>
                  <div>  return (</div>
                  <div style={{ color: '#E2976C' }}>    &lt;Layout&gt;</div>
                  <div style={{ color: '#B496FF' }}>      &lt;Hero /&gt;</div>
                  <div style={{ color: '#E2976C' }}>    &lt;/Layout&gt;</div>
                  <div>  )</div>
                  <div style={{ color: '#7C5CFC' }}>&#125;</div>
                </code>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 10. JOURNAL (BLOG) PREVIEW */}
      <section
        style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}
        className="section-padding"
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Magazine</span>
              <h2 style={{ fontSize: 'min(8vw, 42px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                The Journal
              </h2>
            </div>
            <button
              onClick={() => navigate('/journal')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '14px',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 0'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              Read All Articles
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {journalArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigate(`/journal/${art.id}`)}
                className="glass-card journal-preview-card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>{art.date}</span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-medium)' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>{art.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {art.title}
                  </h3>
                </div>
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. PREMIUM CONTACT / INQUIRY FORM */}
      <section
        ref={inquiryRef}
        id="contact"
        className="section-padding"
        style={{ position: 'relative' }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>

          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Inquiry</span>
            <h2 style={{ fontSize: 'min(8vw, 42px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Let's Create Something Unforgettable
            </h2>
            <p>Skip standard contact cards. Build a premium project profile in seconds.</p>
          </div>

          <div className="glass-card inquiry-form-card" style={{ boxShadow: 'var(--shadow-lg)' }}>

            {/* Step Indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '10px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--border-light)', zIndex: 1 }} />
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: 0,
                  width: `${((inquiryStep - 1) / 2) * 100}%`,
                  height: '2px',
                  backgroundColor: 'var(--accent)',
                  zIndex: 2,
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: inquiryStep >= step ? 'var(--accent)' : 'var(--bg-primary)',
                    border: `2px solid ${inquiryStep >= step ? 'var(--accent)' : 'var(--border-medium)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.4s, border-color 0.4s'
                  }}
                >
                  {inquiryStep > step ? (
                    <Check size={10} style={{ color: '#FFFFFF' }} />
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: 700, color: inquiryStep >= step ? '#FFFFFF' : 'var(--text-light)' }}>
                      {step}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {formSubmitted ? (
              // Success Screen
              <div style={{ textAlign: 'center', padding: '30px 0' }} className="fade-in">
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Inquiry Transmitted Successfully
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto 30px' }}>
                  Thank you, {formData.name}. I have received your request and will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setInquiryStep(1);
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      countryCode: '+91',
                      phone: '',
                      service: 'Website Development',
                      timeline: '1-2 Months',
                      message: ''
                    });
                  }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '13px',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '20px',
                    padding: '10px 24px',
                    cursor: 'pointer'
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              // Main Form Steps
              <form onSubmit={handleNextStep}>

                {/* Step 1: Basic Info */}
                {inquiryStep === 1 && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-grid">
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>What's your name? *</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="John Doe" style={{ width: '100%', padding: '14px 18px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Company</label>
                        <input type="text" name="company" value={formData.company} onChange={handleFormChange} placeholder="Acme Corp" style={{ width: '100%', padding: '14px 18px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
                      </div>
                    </div>
                    <div className="form-grid">
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Email *</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="john@example.com" style={{ width: '100%', padding: '14px 18px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Phone</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input type="text" name="countryCode" value={formData.countryCode} onChange={handleFormChange} placeholder="+91" style={{ width: '80px', padding: '14px 12px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', textAlign: 'center' }} />
                          <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="98765 43210" style={{ flex: 1, padding: '14px 18px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Project Specifications */}
                {inquiryStep === 2 && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>What service are you interested in?</label>
                      <select name="service" value={formData.service} onChange={handleFormChange} style={{ width: '100%', padding: '14px 18px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', backgroundColor: '#FFFFFF' }}>
                        {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Timeline</label>
                      <select name="timeline" value={formData.timeline} onChange={handleFormChange} style={{ width: '100%', padding: '14px 18px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', backgroundColor: '#FFFFFF' }}>
                        <option value="<1 Month">&lt; 1 Month</option>
                        <option value="1-2 Months">1-2 Months</option>
                        <option value="3+ Months">3+ Months</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Project Detail Summary */}
                {inquiryStep === 3 && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Tell me about your project</label>
                      <textarea required name="message" value={formData.message} onChange={handleFormChange} placeholder="Please summarize your project goals, scope, details..." rows={5} style={{ width: '100%', padding: '14px 18px', border: '1px solid var(--border-medium)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons inside Form */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', alignItems: 'center' }}>
                  {inquiryStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setInquiryStep(prev => prev - 1)}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '13px',
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '20px',
                        padding: '10px 24px',
                        cursor: 'pointer'
                      }}
                    >
                      Back
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '13px',
                      backgroundColor: 'var(--text-primary)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '12px 28px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'background-color 0.3s',
                      opacity: formSubmitting ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--text-primary)'}
                  >
                    {inquiryStep === 3 ? (formSubmitting ? 'Sending...' : 'Send Inquiry') : 'Continue'}
                    {inquiryStep === 3 ? (formSubmitting ? null : <Send size={14} />) : <ArrowRight size={14} />}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Quick social links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px', flexWrap: 'wrap' }}>
            <a href="https://wa.me/918541900698" target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>WhatsApp <ArrowUpRight size={14} /></a>
            <a href="https://www.linkedin.com/in/akshattsinha/" target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>LinkedIn <ArrowUpRight size={14} /></a>
            <a href="https://www.instagram.com/akshattsinha/" target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Instagram <ArrowUpRight size={14} /></a>
          </div>

        </div>
      </section>

      {/* Styled utilities for animations */}
      <style>{`
        @keyframes scrollIndicatorAnim {
          0% { transform: translateY(-100%); opacity: 0; }
          40% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        .fade-in {
          animation: formFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes formFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .service-card:hover .service-arrow {
          background-color: var(--accent) !important;
          color: #FFFFFF !important;
          transform: translateX(4px);
        }

        .service-card:hover .card-reflection {
          left: 100%;
        }

        .concept-grid-card:hover .concept-visual-wrap .hover-scale {
          transform: rotate(0deg) scale(1.05) translateY(0px) !important;
        }

        .concept-grid-card:hover .concept-arrow {
          opacity: 1 !important;
          color: var(--accent);
          transform: translate(2px, -2px);
        }

        /* Responsive Layout Rules */
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }

        .service-card {
          padding: 40px;
        }

        .value-card {
          padding: 30px;
        }

        .bts-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 50px;
          align-items: center;
        }

        .journal-preview-card {
          padding: 30px 40px;
        }

        .inquiry-form-card {
          padding: 50px 40px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 50px;
            text-align: center;
          }
          .hero-btn-group {
            justify-content: center;
          }
          .hero-tagline, .hero-desc {
            margin-inline: auto !important;
          }
          .bts-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .float-ui-analytics {
            left: 0px !important;
          }
          .float-ui-mockup {
            right: 0px !important;
          }
          .service-card {
            padding: 24px;
          }
          .value-card {
            padding: 20px;
          }
          .journal-preview-card {
            padding: 24px 20px;
          }
          .inquiry-form-card {
            padding: 30px 20px;
          }
          .bts-card-wireframe {
            left: 5% !important;
            scale: 0.9;
          }
          .bts-card-code {
            right: 5% !important;
            scale: 0.9;
          }
        }

        @media (max-width: 580px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .bts-card-wireframe {
            left: 0% !important;
            top: 10% !important;
            scale: 0.8;
          }
          .bts-card-code {
            right: 0% !important;
            bottom: 10% !important;
            scale: 0.8;
          }
        }

        @media (max-width: 400px) {
          .bts-card-wireframe {
            left: -10px !important;
            scale: 0.7;
          }
          .bts-card-code {
            right: -10px !important;
            scale: 0.7;
          }
        }
      `}</style>

    </div>
  );
};
