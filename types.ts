
export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Data Analysis' | 'Web Development';
  description: string;
  tech: string[];
  link?: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
  category: 'Core' | 'Data Science' | 'Web';
}

export interface NavSection {
  id: string;
  label: string;
}
