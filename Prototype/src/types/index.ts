export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  coins: number;
  streak: number;
  totalPoints: number;
  avatar?: string;
  school?: string;
  grade?: string;
}

export interface EcoTask {
  id: string;
  title: string;
  description: string;
  category: 'energy' | 'waste' | 'water' | 'transport' | 'nature';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  coins: number;
  estimatedTime: string;
  instructions: string[];
  verificationMethod: 'photo' | 'quiz' | 'self-report';
  completed?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  coins: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SkillTreeNode {
  id: string;
  title: string;
  description: string;
  category: string;
  level: number;
  unlocked: boolean;
  completed: boolean;
  prerequisites: string[];
  rewards: {
    points: number;
    coins: number;
    badge?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'digital' | 'physical' | 'experience';
  available: boolean;
  image?: string;
}