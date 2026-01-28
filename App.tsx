
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';
import FloatingNav from './components/FloatingNav';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
import ChatBot from './components/ChatBot';
import CounterAnimation from './components/CounterAnimation';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sync theme with document class for Tailwind 'dark:' utilities
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#020617';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className={`relative min-h-screen transition-colors duration-700 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <GlobalBackground isDarkMode={isDarkMode} />
      <CustomCursor />
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onOpenChat={() => setIsChatOpen(true)} 
      />
      <FloatingNav />
      <ChatBot isDarkMode={isDarkMode} isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      
      <main className="relative z-10 selection:bg-blue-500/30">
        <Hero isDarkMode={isDarkMode} />
        
        {/* About Summary Section */}
        <section id="about" className="py-40 md:py-48 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm">About Me</h2>
              <h3 className={`text-4xl md:text-5xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Solving problems with <span className="text-blue-600 dark:text-blue-400">intelligent data</span> solutions.
              </h3>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-700'} text-lg leading-relaxed font-medium`}>
                I give AI based software services - engineering intelligent solutions that drive real business value. Specialized in machine learning, deep learning, web development with expertise in Python, Power BI, Excel, SQL, and data science.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <CounterAnimation targetValue={10} duration={2000} />
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Projects Completed</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'}`} style={isDarkMode ? {boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'} : {}}>
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <CounterAnimation targetValue={5000} duration={2000} suffix="+" />
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Red Tea</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
               <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 blur-3xl rounded-full opacity-50"></div>
               <div className={`relative p-8 rounded-[2rem] border transition-all shadow-2xl backdrop-blur-md ${isDarkMode ? 'bg-slate-900/40 border-slate-700/50 shadow-blue-500/5' : 'bg-white border-blue-100 shadow-blue-200/40'}`}>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-blue-50 text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]'}`}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AI Innovation</h4>
                        <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed font-medium`}>Engineered RAG systems and computer vision solutions like the AI Virtual Whiteboard.</p>
                      </div>
                    </div>
                    
                    <div className={`pt-8 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-50 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.2)]'}`}>
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Data Analytics</h4>
                          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed font-medium`}>Extracted insights using Power BI and SQL for regional sales and performance dashboards.</p>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <Experience isDarkMode={isDarkMode} />
        <TechStack isDarkMode={isDarkMode} />
        <Portfolio isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
        
        {/* Tailwind Test Element */}
        
      </main>

      <footer className={`relative z-10 py-12 border-t transition-colors duration-500 ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'} backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <a href="#home" className="logo-font text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">SALMAN FARSI</a>
            <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-700'} text-sm mt-2 font-medium`}>AI Developer & Data Science Enthusiast</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/salmanfarsi01" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>GitHub</a>
            <a href="https://www.linkedin.com/in/salman-farsi4545/" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>LinkedIn</a>
            <a href="https://www.youtube.com/watch?v=2pn8qlQe7n0&t=115s" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>YouTube</a>
            <a href="https://www.researchgate.net/profile/Sheikh-Md-Farsi?ev=hdr_xprf" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>ResearchGate</a>
          </div>
          
          <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-700'} text-sm font-medium`}>
            &copy; {new Date().getFullYear()} Sheikh Md Salman Farsi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
