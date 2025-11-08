
import React, { useState } from 'react';
import PageHeader from './PageHeader';
import type { CommunityPost } from '../types';

const mockPosts: CommunityPost[] = [
  { id: 1, author: 'Alex', avatarUrl: 'https://picsum.photos/id/40/100/100', timestamp: '2h ago', content: 'Found an incredible tteokbokki place near Hanyang University! Highly recommend.', imageUrl: 'https://picsum.photos/id/1060/800/600', likes: 23, comments: 5, category: 'Food' },
  { id: 2, author: 'Maria', avatarUrl: 'https://picsum.photos/id/43/100/100', timestamp: '5h ago', content: 'Does anyone have tips for navigating the subway during rush hour? It gets so crowded!', likes: 15, comments: 12, category: 'Tips' },
  { id: 3, author: 'Ben', avatarUrl: 'https://picsum.photos/id/45/100/100', timestamp: '1d ago', content: 'The view from Namsan Tower at sunset is absolutely breathtaking. A must-see!', imageUrl: 'https://picsum.photos/id/1015/800/600', likes: 58, comments: 9, category: 'Culture' },
  { id: 4, author: 'Chloe', avatarUrl: 'https://picsum.photos/id/50/100/100', timestamp: '2d ago', content: 'There\'s a free K-Pop dance performance in Hongdae this Saturday. Who wants to join?', likes: 41, comments: 18, category: 'Events' },
];

const postCategories = ['All', 'Food', 'Culture', 'Tips', 'Events'] as const;
type PostCategory = typeof postCategories[number];

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <div className="bg-white dark:bg-seoul-blue-dark/50 rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="p-4 flex items-center">
            <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full" />
            <div className="ml-4">
                <h4 className="font-bold text-gray-800 dark:text-white">{post.author}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
            </div>
        </div>
        <p className="px-4 pb-4 text-gray-700 dark:text-gray-300">{post.content}</p>
        {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-96 object-cover" />}
        <div className="p-4 flex justify-between items-center text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-6">
                <button className="flex items-center gap-2 hover:text-seoul-ruby transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg> {post.likes}</button>
                <button className="flex items-center gap-2 hover:text-seoul-blue transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> {post.comments}</button>
            </div>
            <span className="text-xs font-semibold bg-seoul-blue/10 text-seoul-blue dark:bg-seoul-blue/30 dark:text-blue-300 px-2 py-1 rounded-full">{post.category}</span>
        </div>
    </div>
);

const Community: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<PostCategory>('All');
    
    const filteredPosts = activeCategory === 'All' 
        ? mockPosts 
        : mockPosts.filter(p => p.category === activeCategory);

  return (
    <div className="p-4">
      <PageHeader title="Community" subtitle="Share experiences and get advice from others." />
      
      <div className="sticky top-0 bg-brand-light/80 dark:bg-seoul-blue-dark/80 backdrop-blur-sm py-3 z-10">
          <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
              {postCategories.map(category => (
                  <button 
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 whitespace-nowrap ${
                          activeCategory === category 
                          ? 'bg-seoul-blue text-white' 
                          : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                      {category}
                  </button>
              ))}
          </div>
      </div>
      
      <div className="mt-4">
        {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Community;