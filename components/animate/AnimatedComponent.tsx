'use client'
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure to register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const AnimatedComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Function to animate the component when it becomes visible
    const animateOnScroll = () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    };

    // Create a ScrollTrigger for the container element
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%', // Trigger animation when 80% of the container is visible
      onEnter: animateOnScroll,
    });

    // Clean up the ScrollTrigger when the component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '300px', background: 'lightblue' }}>
      <h1>This is an animated component</h1>
      <p>Scroll down to see the animation!</p>
    </div>
  );
};

export default AnimatedComponent;
