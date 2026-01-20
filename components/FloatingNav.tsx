
import React, { useEffect, useState } from 'react';
import { NAV_SECTIONS } from '../constants';

const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    NAV_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[5000] flex flex-col gap-6">
      {NAV_SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center justify-end"
          title={section.label}
        >
          <span className={`mr-4 px-3 py-1 rounded-md bg-slate-800 text-slate-100 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-slate-700 whitespace-nowrap`}>
            {section.label}
          </span>
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-blue-500 border-blue-500 scale-125'
                : 'bg-transparent border-slate-600 hover:border-slate-400'
            }`}
          />
        </a>
      ))}
    </nav>
  );
};

export default FloatingNav;
