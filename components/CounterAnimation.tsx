import React, { useState, useEffect, useRef } from 'react';

interface CounterAnimationProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ 
  targetValue, 
  duration = 2000, 
  suffix = '', 
  prefix = '' 
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const animateCount = () => {
      const now = Date.now();
      
      if (now >= endTime) {
        setCount(targetValue);
      } else {
        const progress = (now - startTime) / duration;
        const currentCount = Math.floor(progress * targetValue);
        setCount(currentCount);
        requestAnimationFrame(animateCount);
      }
    };

    const frame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frame);
  }, [targetValue, duration, hasStarted]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

export default CounterAnimation;
