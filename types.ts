export enum Page {
  Administration = 'Administration',
  Lifestyle = 'Lifestyle',
  Food = 'Food',
  MeetAndMatch = 'Meet & Match',
  Messages = 'Messages',
  Community = 'Community',
  Transit = 'Transit',
  Profile = 'My Profile',
}

export interface LanguageGoal {
  language: string;
  goal: 'learn' | 'practice' | 'speak';
}

export interface User {
  name:string;
  email: string;
  bio: string;
  imageUrl: string;
  age?: number;
  nationality?: string;
  // Matching fields
  mbti?: string;
  hobbies?: string[];
  workStyle?: 'Planner' | 'Procrastinator' | 'Go with the flow';
  socialStyle?: 'Introvert' | 'Extrovert' | 'Ambivert';
  languageGoals?: LanguageGoal[];
  likesSports?: 'Yes' | 'No' | 'Sometimes';
}

export interface AdminTask {
  id: number;
  title: string;
  description: string[];
  docs: string[];
  completed: boolean;
  deadline: string;
  link?: string;
  linkLabel?: string;
}

export interface MessageThread {
    id: number;
    name: string;
    avatarUrl: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
}

export interface CommunityPost {
    id: number;
    author: string;
    avatarUrl: string;
    timestamp: string;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: number;
    category: 'Food' | 'Culture' | 'Tips' | 'Events';
}

export interface Restaurant {
    id: number;
    name: string;
    category: string;
    rating: number;
    tags: ('Vegetarian' | 'Halal' | 'Pescatarian' | 'No pork' | 'Vegan' | 'Kosher' | 'No alcohol')[];
    address: string;
    imageUrl: string;
    description: string;
}