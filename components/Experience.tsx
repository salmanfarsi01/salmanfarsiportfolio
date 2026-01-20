
import React from 'react';

interface ExperienceProps {
  isDarkMode?: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ isDarkMode }) => {
  return (
    <section id="experience" className={`py-24 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950/40' : 'bg-[#f8fafc]'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm">Path</h2>
          <h3 className={`text-4xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Experience & Knowledge</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column: Work History & Courses */}
          <div className="space-y-16">
            {/* Work History */}
            <div className="space-y-10">
              <h4 className={`text-2xl font-black flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                Work History
              </h4>
              <div className={`relative pl-10 border-l-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} space-y-12`}>
                <div className="relative">
                  {/* Bullet alignment shifted 0.5px right from -46px to -45.5px */}
                  <div className={`absolute -left-[51px] top-1.5 w-5 h-5 rounded-full bg-blue-500 border-4 ${isDarkMode ? 'border-slate-950' : 'border-white'} shadow-lg z-10`} />
                  <div className="space-y-1">
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest">July 2025 - Present</span>
                    <h5 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>AI Developer</h5>
                    <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-600'} font-bold`}>Join Venture AI</p>
                    <p className={`text-sm pt-2 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Focusing on advanced RAG pipelines, LLM fine-tuning, and scalable AI solutions for business automation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Completed Section */}
            <div className="space-y-10">
              <h4 className={`text-2xl font-black flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                Course Completed
              </h4>
              <div className={`relative pl-10 border-l-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} space-y-10`}>
                {[
                  { title: 'Data Science & Machine Learning with Python & R', platform: 'Data Solution 360', year: '2024', desc: 'Expertise in Neural Networks, CNNs, ML, LLM.' },
                  { title: 'Data Analyst Job Ready Program', platform: 'Data Solution 360', year: '2023', desc: 'Full-stack data analysis and predictive modeling (Python, Power BI, SQL, Excel, EDA).' },
                  { title: 'Full Stack Web Development', platform: 'Shikhbe Shobai', year: '2022', desc: 'Epertise in Html, css, JS (React), Bootstrap, Django'}
                ].map((course, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[51px] top-1.5 w-5 h-5 rounded-full bg-emerald-500 border-4 ${isDarkMode ? 'border-slate-950' : 'border-white'} shadow-md z-10`} />
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{course.year}</span>
                      <h5 className={`text-lg font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{course.title}</h5>
                      <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-600'} text-xs font-bold`}>{course.platform}</p>
                      <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>{course.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Education */}
          <div className="space-y-12">
            <h4 className={`text-2xl font-black flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
              </div>
              Education
            </h4>
            
            <div className={`relative pl-10 border-l-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} space-y-14`}>
              {[
                { period: '2021 - 2025', title: 'B.Sc. in Computer Science & Engineering', org: 'Southeast University', meta: 'CGPA: 3.81 / 4.00' },
                { period: '2017 - 2019', title: 'HSC - Science', org: 'BAF Shaheen College, Dhaka', meta: 'GPA: 4.33 / 5.00' },
                { period: '2007 - 2017', title: 'SSC - Science', org: 'Monipur High School, Dhaka', meta: 'GPA: 5.00 / 5.00' }
              ].map((edu, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[51px] top-1.5 w-5 h-5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} border-4 ${isDarkMode ? 'border-slate-950' : 'border-white'} z-10`} />
                  <div className="space-y-1">
                    <span className={`text-sm font-black ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{edu.period}</span>
                    <h5 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{edu.title}</h5>
                    <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} font-bold`}>{edu.org}</p>
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">
                      {edu.meta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
