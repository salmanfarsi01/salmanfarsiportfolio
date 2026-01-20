
import React, { useMemo, useRef, useEffect, useCallback } from 'react';

interface TechItem {
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface ThreeDCarouselProps {
  items: TechItem[];
  radius?: number;
  cardW?: number;
  cardH?: number;
  isDarkMode: boolean;
  autoSpinSpeed?: number;
}

const DRAG_SENSITIVITY = 0.5;
const INERTIA_FRICTION = 0.95;
const IDLE_TIMEOUT = 2000;

const Card = React.memo(({ item, transform, cardW, cardH, isDarkMode }: { item: TechItem; transform: string; cardW: number; cardH: number; isDarkMode: boolean }) => (
  <div
    className="absolute"
    style={{
      width: cardW,
      height: cardH,
      transform,
      transformStyle: 'preserve-3d',
      willChange: 'transform',
    }}
  >
    <div 
      className={`w-full h-full rounded-xl flex flex-col items-center justify-center gap-2 md:gap-3 border backdrop-blur-2xl transition-all duration-500 group hover:scale-110 shadow-lg`}
      style={{
        backgroundColor: isDarkMode ? `rgba(15, 23, 42, 0.9)` : `rgba(255, 255, 255, 0.95)`,
        borderColor: isDarkMode ? `${item.color}40` : `${item.color}20`,
        boxShadow: `0 0 15px ${item.color}${isDarkMode ? '15' : '10'}`,
        backfaceVisibility: 'hidden'
      }}
    >
      <div 
        className="text-2xl md:text-3xl transition-transform duration-500 group-hover:scale-125 filter drop-shadow-[0_0_8px_currentColor]" 
        style={{ color: item.color }}
      >
        {item.icon}
      </div>
      
      <span 
        className={`text-[8px] md:text-[10px] font-black tracking-widest uppercase text-center px-1 ${isDarkMode ? 'drop-shadow-md' : ''}`} 
        style={{ color: item.color }}
      >
        {item.label}
      </span>

      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none`}></div>
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl" 
        style={{ backgroundColor: item.color }}
      ></div>
    </div>
  </div>
));

const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  items,
  radius = 400,
  cardW = 120,
  cardH = 160,
  isDarkMode,
  autoSpinSpeed = 0.12
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const initialRotationRef = useRef(0);
  const lastInteractionRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!parentRef.current || isDraggingRef.current) return;
      lastInteractionRef.current = Date.now();
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= INERTIA_FRICTION;
        } else if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT) {
          rotationRef.current += autoSpinSpeed;
        }
      }
      
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [autoSpinSpeed]);

  const handleDragStart = useCallback((clientX: number) => {
    lastInteractionRef.current = Date.now();
    isDraggingRef.current = true;
    velocityRef.current = 0;
    dragStartRef.current = clientX;
    initialRotationRef.current = rotationRef.current;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    lastInteractionRef.current = Date.now();
    const deltaX = clientX - dragStartRef.current;
    const newRotation = initialRotationRef.current + deltaX * DRAG_SENSITIVITY;
    velocityRef.current = newRotation - rotationRef.current;
    rotationRef.current = newRotation;
  }, []);

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    lastInteractionRef.current = Date.now();
  }, []);

  const cards = useMemo(() => items.map((item, idx) => {
    const angle = (idx * 360) / items.length;
    return {
      key: idx,
      item,
      transform: `rotateY(${angle}deg) translateZ(${radius}px)`
    };
  }), [items, radius]);

  return (
    <div
      ref={parentRef}
      className="w-full flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
      style={{ userSelect: 'none', height: cardH * 1.5 }}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div className="relative" style={{ perspective: 1500, width: radius * 2, height: cardH }}>
        <div
          ref={wheelRef}
          className="relative"
          style={{
            width: cardW,
            height: cardH,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -cardW / 2,
            marginTop: -cardH / 2,
          }}
        >
          {cards.map(card => (
            <Card key={card.key} item={card.item} transform={card.transform} cardW={cardW} cardH={cardH} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
