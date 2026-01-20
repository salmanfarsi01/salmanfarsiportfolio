
import React, { useState, useEffect, useMemo } from 'react';
import ThreeDCarousel from './ThreeDCarousel';

// Enhanced Icons using detailed SVG paths
const Icons = {
  Brain: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  Circuit: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2-2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  Layers: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  SearchDoc: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Sync: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Container: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  Plug: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Terminal: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Database: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Chart: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Grid: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  Code: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  Brush: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  Atom: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  Lightning: <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
};

const ALL_TECH_ITEMS = [
  { label: 'LLM', icon: Icons.Brain, color: '#60a5fa' },
  { label: 'ML', icon: Icons.Circuit, color: '#a855f7' },
  { label: 'DL', icon: Icons.Layers, color: '#f472b6' },
  { label: 'RAG', icon: Icons.SearchDoc, color: '#34d399' },
  { label: 'MLOps', icon: Icons.Sync, color: '#fbbf24' },
  { label: 'Docker', icon: Icons.Container, color: '#2496ed' },
  { label: 'API', icon: Icons.Plug, color: '#ff6c37' },
  { label: 'Fast API', icon: Icons.Lightning, color: '#05998b' },
  { label: 'Django', icon: Icons.Terminal, color: '#00ff87' }, 
  { label: 'HuggingFace', icon: Icons.Brain, color: '#ffcc00' },
  { label: 'Python', icon: Icons.Code, color: '#3776ab' },
  { label: 'SQL', icon: Icons.Database, color: '#f29111' },
  { label: 'Power BI', icon: Icons.Chart, color: '#f2c811' },
  { label: 'Excel', icon: Icons.Grid, color: '#217346' },
  { label: 'HTML', icon: Icons.Code, color: '#e34f26' },
  { label: 'CSS', icon: Icons.Brush, color: '#1572b6' },
  { label: 'React JS', icon: Icons.Atom, color: '#61dafb' },
  { label: 'Bootstrap', icon: Icons.Brush, color: '#7952b3' },
];

interface TechStackProps {
  isDarkMode: boolean;
}

const TechStack: React.FC<TechStackProps> = ({ isDarkMode }) => {
  const [dimensions, setDimensions] = useState({ radius: 450, cardW: 120, cardH: 160, isMobile: false });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDimensions({ radius: 140, cardW: 70, cardH: 95, isMobile: true });
      } else if (w < 768) {
        setDimensions({ radius: 200, cardW: 85, cardH: 110, isMobile: true });
      } else if (w < 1024) {
        setDimensions({ radius: 300, cardW: 100, cardH: 130, isMobile: true });
      } else {
        setDimensions({ radius: 450, cardW: 120, cardH: 160, isMobile: false });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Split items for mobile to prevent overlapping
  const carouselGroups = useMemo(() => {
    if (dimensions.isMobile) {
      const half = Math.ceil(ALL_TECH_ITEMS.length / 2);
      return [
        ALL_TECH_ITEMS.slice(0, half),
        ALL_TECH_ITEMS.slice(half)
      ];
    }
    return [ALL_TECH_ITEMS];
  }, [dimensions.isMobile]);

  return (
    <section id="tech-stack" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm">Skills Radar</h2>
          <h3 className={`text-3xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Tech Ecosystem</h3>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} max-w-xl mx-auto font-medium text-sm md:text-base`}>
            {dimensions.isMobile 
              ? "Swipe to explore my core stack - divided into categories for clarity."
              : "Interactive 3D Carousel — drag to explore my core stack across AI, Data, and Web."
            }
          </p>
        </div>

        <div className={`relative flex flex-col items-center ${dimensions.isMobile ? 'gap-16' : 'py-10 min-h-[450px]'}`}>
          {!dimensions.isMobile && (
            <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent ${isDarkMode ? 'via-slate-800' : 'via-slate-200'} to-transparent opacity-50`}></div>
          )}
          
          {carouselGroups.map((group, idx) => (
            <div key={idx} className={`w-full flex justify-center ${dimensions.isMobile ? 'h-[200px] md:h-[280px]' : ''}`}>
              <ThreeDCarousel 
                items={group} 
                radius={dimensions.radius} 
                cardW={dimensions.cardW}
                cardH={dimensions.cardH}
                isDarkMode={isDarkMode}
                autoSpinSpeed={idx % 2 === 0 ? 0.12 : -0.12} // Alternate directions for cool effect
              />
            </div>
          ))}

          <div className="mt-8 md:mt-16 flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.25em]">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> AI Engineering</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Data Analyst</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Web Development</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
