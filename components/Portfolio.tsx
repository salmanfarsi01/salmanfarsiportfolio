
import React, { useState } from 'react';
import { PROJECTS } from '../constants';

interface PortfolioProps {
  isDarkMode: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ isDarkMode }) => {
  const [filter, setFilter] = useState<'All' | 'AI/ML' | 'Data Analysis' | 'Web Development'>('All');
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 6;

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);
  const canToggle = filteredProjects.length > INITIAL_COUNT;

  const handleFilterChange = (cat: any) => {
    setFilter(cat);
    setShowAll(false); // Reset to collapsed view when switching filters
  };

  return (
    <section id="portfolio" className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-16 gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm">Showcase</h2>
            <h3 className={`text-3xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Latest Projects</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {['All', 'AI/ML', 'Data Analysis', 'Web Development'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat as any)}
                className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'btn-neon-blue text-blue-500' 
                    : (isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProjects.map((project) => (
            <div key={project.id} className={`group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800 hover:shadow-blue-500/10' : 'bg-white border-slate-200 hover:shadow-blue-500/10'}`}>
              <div className="h-48 md:h-56 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/600/400?random=${project.id}`} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 px-3 py-1 btn-neon-blue bg-blue-600/20 text-blue-500 text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  {project.category}
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <h4 className={`text-lg md:text-xl font-black transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>
                  {project.title}
                </h4>
                <p className={`text-xs md:text-sm leading-relaxed line-clamp-3 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1">
                  {project.tech.map(t => (
                    <span key={t} className={`text-[8px] md:text-[9px] font-black px-2 md:px-3 py-1 rounded uppercase tracking-tighter ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-4 md:pt-6">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 font-black text-xs md:text-sm hover:gap-4 transition-all hover:text-blue-400"
                  >
                    View Project Details
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canToggle && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-neon-blue px-10 py-4 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 active:scale-95 transition-all shadow-xl"
            >
              {showAll ? "Show Less" : "See More Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
