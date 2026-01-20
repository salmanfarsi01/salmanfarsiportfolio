
import React, { useEffect, useState } from 'react';
import HeroParticles from './HeroParticles';

interface HeroProps {
  isDarkMode?: boolean;
}

const ROLES = ['AI Developer', 'Data Scientist', 'ML Engineer', 'Full Stack Developer'];

const Hero: React.FC<HeroProps> = ({ isDarkMode = true }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timeout: any;
    const currentFullRole = ROLES[roleIndex];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedRole(currentFullRole.substring(0, displayedRole.length - 1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayedRole(currentFullRole.substring(0, displayedRole.length + 1));
      }, 150);
    }

    if (!isDeleting && displayedRole === currentFullRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-12">
      {/* Interactive Particle Background */}
      <HeroParticles isDarkMode={isDarkMode} />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6 text-left">
          <div className="space-y-1">
            <div className="relative inline-block mb-1">
              <h2 className={`text-4xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                I'm
              </h2>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-700 via-sky-400 to-indigo-600 bg-clip-text text-transparent animate-text-gradient">
                Salman Farsi
              </span>
            </h1>
            
            <div className="h-10 flex items-center">
              <p className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {displayedRole}
                <span className="inline-block w-1 h-7 ml-1 bg-blue-500 animate-pulse align-middle" />
              </p>
            </div>
          </div>

          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm md:text-base leading-relaxed max-w-lg font-medium opacity-90`}>
            Passionate about turning data into smart solutions. Specialized in RAG systems, LLMs, and Data Science. I bridge the gap between complex AI research and practical web solutions.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#portfolio" className="btn-neon-blue px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-blue-500 dark:text-blue-400">
              View My Work
            </a>
            <a href="#contact" className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all transform hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'}`}>
              Contact Me
            </a>
          </div>
        </div>

        <div className="relative group flex justify-center md:justify-end">
          {/* Image Card: Fixed position (no float) with high quality tech background */}
          <div className={`relative w-full max-w-[280px] md:max-w-[340px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 shadow-2xl transition-all duration-700 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-white bg-white'}`}>
            <img 
              src="\images\farsi2.png" 
              alt="Salman Farsi" 
              // className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Real-time Status Badge - Bouncy as requested */}
            <div className={`absolute bottom-4 right-4 p-4 rounded-2xl backdrop-blur-xl border-2 shadow-2xl transform animate-bounce-subtle min-w-[150px] ${isDarkMode ? 'bg-slate-950/90 border-blue-500/30 shadow-blue-500/20' : 'bg-white/95 border-blue-200 shadow-xl'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <div className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {formattedTime}
                </div>
              </div>
              
              <div className={`text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
