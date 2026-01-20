
import React, { useState, useEffect } from 'react';
import { NAV_SECTIONS } from '../constants';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onOpenChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, onOpenChat }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBaseClasses = "fixed top-0 left-0 w-full z-[9000] transition-all duration-500 border-b";
  const headerStateClasses = isScrolled 
    ? `${isDarkMode ? 'bg-slate-950/80 border-white/5 shadow-2xl' : 'bg-white/80 border-slate-200 shadow-sm'} backdrop-blur-md py-3`
    : `bg-transparent border-transparent py-6`;

  return (
    <header className={`${headerBaseClasses} ${headerStateClasses}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="logo-font text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 whitespace-nowrap mr-4">
          SALMAN FARSI
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <ul className="flex gap-6 xl:gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group`}>
                  {section.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 xl:p-2.5 rounded-full transition-all duration-500 border-2 group relative overflow-hidden active:scale-90 ${isDarkMode ? 'bg-slate-900 border-yellow-500/20' : 'bg-white border-blue-500/10 shadow-lg shadow-blue-500/5'}`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'bg-yellow-500/10 opacity-100' : 'bg-blue-500/5 opacity-0'}`}></div>
            <svg 
              className={`w-5 h-5 xl:w-6 xl:h-6 transition-all duration-700 transform ${isDarkMode ? 'text-yellow-400 fill-yellow-400/20 rotate-0 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'text-slate-400 fill-transparent -rotate-12 scale-100'}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M9 18h6" /><path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
            </svg>
          </button>

          <button 
            onClick={onOpenChat}
            className="btn-neon-blue px-5 xl:px-6 py-2 xl:py-2.5 text-blue-500 dark:text-blue-400 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 whitespace-nowrap"
          >
            Let's Talk
          </button>
        </nav>

        {/* Mobile & Tablet Toggle Group */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
           <button 
             onClick={toggleTheme} 
             className={`p-2 rounded-full transition-all active:scale-90 border ${isDarkMode ? 'bg-slate-900/50 border-yellow-500/20 text-yellow-400' : 'bg-slate-100 border-blue-500/10 text-slate-500'}`}
           >
             <svg className={`w-6 h-6 ${isDarkMode ? 'drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
             </svg>
           </button>
           
           <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
             className={`p-2 active:scale-90 transition-transform ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}
             aria-label="Toggle menu"
           >
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} />
             </svg>
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[9001] transition-transform duration-700 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden ${isDarkMode ? 'bg-slate-950/98 backdrop-blur-xl' : 'bg-white/98 backdrop-blur-xl'}`}>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute top-6 left-6 p-3 rounded-full transition-all active:scale-90 flex items-center justify-center ${isDarkMode ? 'text-white hover:bg-slate-800/50' : 'text-slate-900 hover:bg-slate-100'}`}
          aria-label="Back to page"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col h-full p-10 pt-28">
          <ul className="flex flex-col gap-8 text-3xl sm:text-4xl font-black uppercase tracking-tighter">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`block transition-all hover:translate-x-2 ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'}`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto pb-10">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenChat();
              }}
              className="btn-neon-blue block w-full text-center py-5 text-blue-500 dark:text-blue-400 rounded-2xl font-black uppercase tracking-[0.2em] text-sm"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
