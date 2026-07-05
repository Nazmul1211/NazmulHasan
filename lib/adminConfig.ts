// Admin dashboard configuration
export const PORTFOLIO_STORAGE_KEY = 'nh_portfolio_data_v1';

export const adminSections = [
  { key: 'hero',       label: 'Hero',       icon: 'Sparkles',      description: 'Name, roles, description, resume link' },
  { key: 'about',      label: 'About',      icon: 'User',          description: 'Bio paragraphs, stats, hobbies' },
  { key: 'skills',     label: 'Skills',     icon: 'Wrench',        description: 'Skill categories and proficiency levels' },
  { key: 'projects',   label: 'Projects',   icon: 'FolderGit',     description: 'Project cards, links, challenges, future plans' },
  { key: 'experience', label: 'Experience', icon: 'Briefcase',     description: 'Work history and responsibilities' },
  { key: 'education',  label: 'Education',  icon: 'GraduationCap', description: 'Schools, degrees, dates' },
  { key: 'contact',    label: 'Contact',    icon: 'Mail',          description: 'Email, phone, WhatsApp, social links' },
  { key: 'messages',   label: 'Messages',   icon: 'MessageSquare',  description: 'View client contact form submissions' },
  { key: 'settings',   label: 'Settings',   icon: 'Settings',      description: 'Update admin account security' },
] as const;

export type SectionKey = typeof adminSections[number]['key'];
