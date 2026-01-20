
import { Project, Skill, NavSection } from './types';

export const NAV_SECTIONS: NavSection[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
];

export const SKILLS: Skill[] = [
  { name: 'Python', level: 90, category: 'Core' },
  { name: 'Machine Learning', level: 85, category: 'Data Science' },
  { name: 'Deep Learning', level: 80, category: 'Data Science' },
  { name: 'NLP / LLMs', level: 82, category: 'Data Science' },
  { name: 'SQL', level: 85, category: 'Core' },
  { name: 'Power BI', level: 88, category: 'Data Science' },
  { name: 'Advanced Excel', level: 90, category: 'Data Science' },
  { name: 'React / JS', level: 75, category: 'Web' },
  { name: 'PHP / Laravel', level: 70, category: 'Web' },
  { name: 'Django / FastAPI', level: 78, category: 'Web' }
];

const GITHUB_BASE = "https://github.com/salmanfarsi01";

export const PROJECTS: Project[] = [
  // --- AI / MACHINE LEARNING PROJECTS (10) ---
  {
    id: 'wine-quality-mlops',
    title: 'wine-quality-MLOps',
    category: 'AI/ML',
    description: 'End‑to‑end MLOps pipeline for wine quality prediction featuring comprehensive model monitoring and tracking.',
    tech: ['Python', 'MLOps', 'Scikit-Learn', 'DVC'],
    link: `${GITHUB_BASE}/-wine-quality-MLOps`
  },
  {
    id: 'searchmind',
    title: 'SearchMind',
    category: 'AI/ML',
    description: 'RAG‑powered document QA chatbot built with Flask, Pinecone Vector Database, and hosted on AWS infrastructure.',
    tech: ['Flask', 'Pinecone', 'AWS', 'OpenAI'],
    link: `${GITHUB_BASE}/SearchMind`
  },
  {
    id: 'ai-fitness-solutions',
    title: 'AI_Fitness_Solutions',
    category: 'AI/ML',
    description: 'An intelligent AI platform providing personalized fitness suggestions and context-aware chatbot responses.',
    tech: ['Python', 'NLP', 'TensorFlow', 'API Integration'],
    link: `${GITHUB_BASE}/AI_Fitness_Solutions`
  },
  {
    id: 'dream-analysis-chatbot',
    title: 'Updated_dream_analysis_chatbot',
    category: 'AI/ML',
    description: 'Sophisticated dream interpretation chatbot utilizing TTS / STT and ElevenLabs for realistic voice interactions.',
    tech: ['ElevenLabs', 'Python', 'OpenAI', 'STT/TTS'],
    link: `${GITHUB_BASE}/Updated_dream_analysis_chatbot_TTS_STS_using_elevenlabs`
  },
  {
    id: 'multimodal-rag',
    title: 'Multimodal-RAG-Chatbot',
    category: 'AI/ML',
    description: 'Advanced Multimodal RAG assistant utilizing GPT-4o, Pinecone, and high-dimensional text embeddings.',
    tech: ['GPT-4o', 'Pinecone', 'LangChain', 'Python'],
    link: `${GITHUB_BASE}/Multimodal-RAG-Chatbot-with-GPT-4o-Pinecone-and-Text-Embeddings`
  },
  {
    id: 'explainable-dream-bot',
    title: 'explainable_Dream_Chat_Bot',
    category: 'AI/ML',
    description: 'Jupyter-based chatbot implementation with a specific focus on XAI (Explainable AI) and decision transparency.',
    tech: ['Python', 'Jupyter', 'SHAP', 'LIME'],
    link: `${GITHUB_BASE}/explainable_Dream_Chat_Bot`
  },
  {
    id: 'ai-voice-cloning',
    title: 'AI_Voice_Cloning',
    category: 'AI/ML',
    description: 'High-fidelity personalized voice cloning system using state-of-the-art Text-to-Speech (TTS) technology.',
    tech: ['TTS', 'PyTorch', 'Audio Processing'],
    link: `${GITHUB_BASE}/AI_Voice_Cloning`
  },
  {
    id: 'rag-llama3',
    title: 'Rag_Chatbot_using_llama3',
    category: 'AI/ML',
    description: 'Robust RAG pipeline implementation utilizing Meta\'s Llama3 for intelligent document retrieval and answering.',
    tech: ['Llama3', 'Ollama', 'LangChain', 'VectorDB'],
    link: `${GITHUB_BASE}/Rag_Chatbot_using_llama3`
  },
  {
    id: 'ai-pdf-gen',
    title: 'AI_PDF_Generator',
    category: 'AI/ML',
    description: 'AI-driven system that generates informative, structured PDF documents based on user text input and NLP analysis.',
    tech: ['Python', 'NLP', 'ReportLab', 'GPT'],
    link: `${GITHUB_BASE}/AI_will_generate_informative_PDF_based_on_your_given_input`
  },
  {
    id: 'simple-rag-gemini',
    title: 'Simple-RAG-Chatbot',
    category: 'AI/ML',
    description: 'Streamlined and efficient RAG pipeline implementation optimized for the Google Gemini API.',
    tech: ['Gemini API', 'Python', 'LangChain', 'Streamlit'],
    link: `${GITHUB_BASE}/Simple-RAG-Chatbot`
  },

  // --- DATA ANALYSIS PROJECTS (5) ---
  {
    id: 'mysql-analysis',
    title: 'Data-Analysis-Projects-MySQL',
    category: 'Data Analysis',
    description: 'Extensive collection of data analysis projects executed using MySQL Workbench to extract business insights.',
    tech: ['MySQL', 'SQL Workbench', 'Data Cleaning'],
    link: `${GITHUB_BASE}/Data-Analysis-Projects-with-MySQL-Workbench`
  },
  {
    id: 'sales-dashboard',
    title: 'Sales-Dashboard-Power-BI',
    category: 'Data Analysis',
    description: 'Executive Power BI dashboard offering regional sales insights and performance visualization for decision-makers.',
    tech: ['Power BI', 'DAX', 'Data Visualization'],
    link: `${GITHUB_BASE}/Sales-Dashboard-with-Executive-Regional-Insights-Power-BI`
  },
  {
    id: 'women-empowerment-survey',
    title: 'Women-Empowerment-Survey',
    category: 'Data Analysis',
    description: 'Statistical analysis regarding women empowerment based on sex preference, highlighting survey trends.',
    tech: ['Python', 'Statistics', 'EDA', 'XAI'],
    link: `${GITHUB_BASE}/Statistical-survey-about-women-empowerment-based-sex-preference`
  },
  {
    id: 'cardio-prediction',
    title: 'cardio-vascular-prediction',
    category: 'Data Analysis',
    description: 'Comparison of multiple machine learning models for cardiovascular disease prediction and risk assessment.',
    tech: ['ML', 'Pandas', 'Matplotlib', 'Scikit-Learn'],
    link: `${GITHUB_BASE}/cardio-vascular-prediction-using-ML`
  },
  {
    id: 'heart-disease-ml',
    title: 'heart_disease_prediction_ml',
    category: 'Data Analysis',
    description: 'Predictive modeling project for heart disease identification using classification algorithms and health metrics.',
    tech: ['Python', 'Machine Learning', 'Seaborn'],
    link: `${GITHUB_BASE}/heart_disease_prediction_ml`
  },

  // --- DJANGO / WEB PROJECTS (2) ---
  {
    id: 'django-profile-dashboard',
    title: 'Django-User-Profile-Dashboard',
    category: 'Web Development',
    description: 'Complete Django web application featuring secure user registration, profiles, and a full CRUD dashboard.',
    tech: ['Django', 'Python', 'SQLite', 'Bootstrap'],
    link: `${GITHUB_BASE}/Basic_Django_User_Profile_-_-Dashboard`
  },
  {
    id: 'django-text-to-voice',
    title: 'Text_To_Voice_Converter_AI',
    category: 'Web Development',
    description: 'Full-stack Django application that uses AI to convert user text into high-quality spoken audio files.',
    tech: ['Django', 'AI-TTS', 'Python', 'JavaScript'],
    link: `${GITHUB_BASE}/Text_To_Voice_Converter_AI_Website`
  }
];
