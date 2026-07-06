import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch device
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0)
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    // Mouse positions
    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const followerPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // GSAP Ticker for smooth animation
    const updateCursor = () => {
      // Small lag for dot
      dotPos.x += (mouse.x - dotPos.x) * 0.25;
      dotPos.y += (mouse.y - dotPos.y) * 0.25;

      // Larger lag for follower ring
      followerPos.x += (mouse.x - followerPos.x) * 0.12;
      followerPos.y += (mouse.y - followerPos.y) * 0.12;

      if (cursorDotRef.current) {
        gsap.set(cursorDotRef.current, {
          x: dotPos.x,
          y: dotPos.y,
        });
      }

      if (cursorFollowerRef.current) {
        gsap.set(cursorFollowerRef.current, {
          x: followerPos.x,
          y: followerPos.y,
        });
      }
    };

    gsap.ticker.add(updateCursor);

    // Hover listeners
    const onMouseEnterLink = () => {
      if (cursorDotRef.current && cursorFollowerRef.current) {
        gsap.to(cursorDotRef.current, {
          scale: 4,
          backgroundColor: '#7C5CFC',
          opacity: 0.15,
          mixBlendMode: 'normal',
          duration: 0.3,
        });
        gsap.to(cursorFollowerRef.current, {
          scale: 1.5,
          borderColor: '#7C5CFC',
          borderWidth: '2px',
          duration: 0.3,
        });
      }
    };

    const onMouseLeaveLink = () => {
      if (cursorDotRef.current && cursorFollowerRef.current) {
        gsap.to(cursorDotRef.current, {
          scale: 1,
          backgroundColor: 'var(--accent)',
          opacity: 1,
          mixBlendMode: 'difference',
          duration: 0.3,
        });
        gsap.to(cursorFollowerRef.current, {
          scale: 1,
          borderColor: 'var(--accent)',
          borderWidth: '1px',
          duration: 0.3,
        });
      }
    };

    // Attach event listeners to buttons, links and elements with interactive cursor
    const attachListeners = () => {
      const targets = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .glass-card, .interactive-cursor');
      targets.forEach((target) => {
        target.addEventListener('mouseenter', onMouseEnterLink);
        target.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    attachListeners();

    // Create an observer to attach listeners to dynamically created elements
    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(updateCursor);
      observer.disconnect();

      const targets = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .glass-card, .interactive-cursor');
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', onMouseEnterLink);
        target.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorDotRef} className="custom-cursor" />
      <div ref={cursorFollowerRef} className="custom-cursor-follower" />
    </>
  );
};
