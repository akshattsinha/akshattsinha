import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  const loaderWords = [
    "CRAFTSMANSHIP",
    "ATTENTION TO DETAIL",
    "CREATIVE INTELLIGENCE",
    "PREMIUM DESIGN",
    "AKSHAT SINHA"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Word cycler
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < loaderWords.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    // Progress counter
    const counterObj = { value: 0 };
    const progressTimeline = gsap.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(counterObj.value));
      },
      onComplete: () => {
        clearInterval(wordInterval);
        setCurrentWordIndex(loaderWords.length - 1);
        
        // Outro animations
        const tl = gsap.timeline({
          onComplete: onComplete
        });
        
        tl.to(wordsRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in"
        })
        .to(percentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in"
        }, "-=0.3")
        .to(progressBarRef.current, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.4,
          ease: "power3.in"
        }, "-=0.3")
        .to(loaderRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.8,
          ease: "power4.inOut"
        }, "-=0.2");
      }
    });

    return () => {
      clearInterval(wordInterval);
      progressTimeline.kill();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      {/* Top Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ 
          fontFamily: 'var(--font-heading)', 
          fontWeight: 600, 
          fontSize: '14px', 
          letterSpacing: '0.1em',
          color: '#111111' 
        }}>
          PORTFOLIO EXP.
        </span>
        <span style={{ 
          fontFamily: 'var(--font-body)', 
          fontSize: '12px', 
          color: 'var(--text-light)' 
        }}>
          © 2026 AS
        </span>
      </div>

      {/* Center Word Slider */}
      <div style={{ overflow: 'hidden', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div 
          ref={wordsRef}
          key={currentWordIndex}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'min(7vw, 64px)',
            letterSpacing: '-0.02em',
            color: '#111111',
            textAlign: 'center',
            animation: 'slideUpText 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {loaderWords[currentWordIndex]}
        </div>
      </div>

      {/* Bottom Progress Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div style={{ maxWidth: '300px' }}>
            <p style={{ fontSize: '12px', lineHeight: '1.4', margin: 0, color: 'var(--text-light)' }}>
              BUILDING BRAND IDENTITY & DIGITAL EXPERIENCES
            </p>
          </div>
          <div 
            ref={percentRef}
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 300, 
              fontSize: '48px', 
              lineHeight: '1', 
              color: '#111111' 
            }}
          >
            {progress}%
          </div>
        </div>

        {/* Progress Bar Container */}
        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-light)', position: 'relative', overflow: 'hidden' }}>
          <div 
            ref={progressBarRef}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              backgroundColor: 'var(--accent)',
              width: `${progress}%`,
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>

      {/* Styled text keyframes */}
      <style>{`
        @keyframes slideUpText {
          0% {
            transform: translateY(100%);
            opacity: 0;
            filter: blur(5px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
};
