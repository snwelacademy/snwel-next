'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeInStaggered = ({ children, className }: {children: any, className?: string}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the animation when the component is in view
            animate();
            // Disconnect the observer after animation is triggered once
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // Trigger animation when at least 10% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const animate = () => {
      gsap.from('.premium-card', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.in',
        stagger: 0.1,
      });
    };

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef?.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default FadeInStaggered;
