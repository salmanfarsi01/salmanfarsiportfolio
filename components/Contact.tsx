
import React, { useState } from 'react';

interface ContactProps {
  isDarkMode?: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);

      const response = await fetch('https://formspree.io/f/mgvzzpka', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className={`py-20 md:py-24 transition-colors duration-500 ${isDarkMode ? '' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          
          <div className="grid lg:grid-cols-2">
            {/* Contact Info Column */}
            <div className="p-10 md:p-16 lg:p-20 space-y-10 md:space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs md:text-sm">Get in touch</h2>
                <h3 className={`text-3xl md:text-5xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Let's build something <br className="hidden md:block"/> great together.</h3>
              </div>

              <div className="space-y-6 md:space-y-8 w-full max-w-sm lg:max-w-none">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-blue-600/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-blue-600/5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Email Me</p>
                    <p className={`text-base md:text-lg font-bold break-all ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>salmanf4545@gmail.com</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-emerald-600/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-emerald-600/5 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Call Me</p>
                    <p className={`text-base md:text-lg font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>+880 1986809848</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <form 
              className={`p-10 md:p-16 lg:p-20 space-y-6 transition-colors duration-500 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`} 
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-xl px-4 py-3 outline-none transition-all border text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-xl px-4 py-3 outline-none transition-all border text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full rounded-xl px-4 py-3 outline-none transition-all border text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                  placeholder="Project Inquiry" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className={`w-full rounded-xl px-4 py-3 outline-none transition-all border resize-none text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              
              {submitStatus === 'success' && (
                <div className="text-green-500 text-sm font-medium">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-500 text-sm font-medium">
                  ❌ Failed to send message. Please try again or contact me directly.
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-neon-blue w-full py-4 text-blue-500 dark:text-blue-400 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
