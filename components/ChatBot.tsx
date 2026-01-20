
import React, { useState, useRef, useEffect } from 'react';
import { Groq } from 'groq-sdk';
import { PROJECTS, SKILLS } from '../constants';

/**
 * SALMAN_KNOWLEDGE_BASE
 * This variable acts as the primary data source for the AI assistant.
 * It contains structured information about Salman's bio, education, experience, and projects.
 */
const SALMAN_KNOWLEDGE_BASE = `
USER PROFILE: Sheikh Md Salman Farsi
ROLE: AI Developer & Data Scientist
LOCATION: Dhaka, Bangladesh

BIO:
Passionate about machine learning, deep learning, and web development. 
Seeking a career in a growth-oriented organization that values hard work and analytical skills.
Specialized in RAG systems, LLMs (fine-tuning, Langchain), and Data Science.

EDUCATION:
- B.Sc. in Computer Science & Engineering from Southeast University (2021-2025). CGPA: 3.81/4.00.
- HSC from BAF Shaheen College, Dhaka (2017-2019). GPA: 4.33/5.00.
- SSC from Monipur High School, Dhaka (2007-2017). GPA: 5.00/5.00.

WORK EXPERIENCE:
- AI Developer at Join Venture AI (Starting July 2025). Focus: RAG pipelines, LLM fine-tuning, business automation.

CORE SKILLS:
${SKILLS.map(s => `- ${s.name}: ${s.level}% proficiency (${s.category})`).join('\n')}

PROJECT HIGHLIGHTS (AI/ML):
1. wine-quality-MLOps: End-to-end pipeline with DVC/Scikit-learn.
2. SearchMind: RAG document QA (Flask/Pinecone/AWS).
3. AI_Fitness_Solutions: Fitness suggestions and chatbot.
4. Updated_dream_analysis_chatbot: TTS/STT using ElevenLabs.
5. Multimodal-RAG-Chatbot: GPT-4o vision + Pinecone.
6. explainable_Dream_Chat_Bot: Focus on XAI (SHAP/LIME).
7. AI_Voice_Cloning: High-fidelity voice synthesis.
8. Rag_Chatbot_using_llama3: Llama3 implementation for RAG.
9. AI_PDF_Generator: NLP-driven PDF creation.
10. Simple-RAG-Chatbot: Gemini API optimization.

PROJECT HIGHLIGHTS (DATA ANALYSIS):
- MySQL Analysis, Sales Dashboards (Power BI), Women Empowerment Survey, Cardiovascular Prediction.

PROJECT HIGHLIGHTS (DJANGO):
- User Profile Dashboard, Text to Voice Converter AI Website.

CONTACT:
Email: salmanf4545@gmail.com
Phone: +880 1986809848
GitHub: github.com/salmanfarsi01
LinkedIn: linkedin.com/in/salman-farsi4545/
`;

interface ChatBotProps {
  isDarkMode: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ isDarkMode, isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Salman's AI portfolio assistant. How can I help you explore his work today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Use Groq for high performance and reliability
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      console.log('API Key available:', !!apiKey, 'Value starts with:', apiKey?.substring(0, 10));
      if (!apiKey) {
        throw new Error('Groq API key not found. Please check your .env.local file and restart the dev server.');
      }
      const groq = new Groq({ 
        apiKey,
        dangerouslyAllowBrowser: true 
      });
      
      const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are Salman Farsi's intelligent Portfolio Assistant. 
          Use the following KNOWLEDGE BASE to answer user questions:
          
          --- KNOWLEDGE BASE ---
          ${SALMAN_KNOWLEDGE_BASE}
          --- END KNOWLEDGE BASE ---

          INSTRUCTIONS:
          1. Answer accurately based ONLY on the knowledge base provided.
          2. If asked about contact info, provide the email or phone number listed.
          3. If asked about projects, mention specific ones like 'SearchMind' or 'Multimodal-RAG'.
          4. Be professional, friendly, and concise.
          5. If asked a question unrelated to Salman's portfolio, politely redirect to his skills or projects.
          6. Format lists using bullet points for readability.`
          },
          // Skip the initial greeting message and start from actual conversation
          ...messages.slice(1).map(m => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.text
          })),
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.6,
        max_tokens: 1024,
      });

      const botResponse = response.choices[0]?.message?.content || "I'm sorry, I'm having trouble processing that right now. Could you rephrase?";
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setMessages(prev => [...prev, { role: 'model', text: `I encountered an error: ${errorMessage}. Please try again later.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${
          isDarkMode 
            ? 'bg-blue-600 text-white shadow-blue-500/20' 
            : 'bg-blue-500 text-white shadow-blue-400/40'
        }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 z-[9999] w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[70vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-500 transform ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
      } ${isDarkMode ? 'bg-slate-900/95 border border-slate-700 backdrop-blur-xl' : 'bg-white border border-slate-100 shadow-blue-100'}`}>
        
        {/* Header */}
        <div className={`px-6 py-4 flex items-center gap-4 ${isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50/50'}`}>
          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-inner">SF</div>
             <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
          </div>
          <div>
            <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Salman's Assistant</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Powered by Groq</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className={`ml-auto p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-500'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : isDarkMode 
                    ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700' 
                    : 'bg-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-slate-100'}`}>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about AI, Data or Web projects..."
              className={`w-full pl-4 pr-12 py-3 rounded-xl outline-none transition-all text-sm font-medium ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 focus:bg-slate-700 placeholder:text-slate-500' 
                  : 'bg-slate-50 text-slate-800 focus:bg-slate-100 placeholder:text-slate-400'
              }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-30 disabled:hover:text-blue-500 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <p className="text-[9px] text-center mt-2 font-bold text-slate-500 uppercase tracking-tighter opacity-50">Salman Farsi AI Assistant v2.0</p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
