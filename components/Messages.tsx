
import React, { useState } from 'react';
import PageHeader from './PageHeader';
import type { MessageThread } from '../types';

const mockThreads: MessageThread[] = [
  { id: 1, name: 'Sophie', avatarUrl: 'https://picsum.photos/id/1011/100/100', lastMessage: 'That sounds amazing! Let\'s go!', timestamp: '10:42 AM', unread: true },
  { id: 2, name: 'Ji-hoon', avatarUrl: 'https://picsum.photos/id/1005/100/100', lastMessage: 'Haha, for sure. See you then.', timestamp: 'Yesterday', unread: false },
  { id: 3, name: 'Carlos', avatarUrl: 'https://picsum.photos/id/1025/100/100', lastMessage: 'Did you check out that BBQ place?', timestamp: '2d ago', unread: false },
];

const ThreadItem: React.FC<{ thread: MessageThread; isActive: boolean; onClick: () => void; }> = ({ thread, isActive, onClick }) => (
    <div onClick={onClick} className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${isActive ? 'bg-seoul-blue-light/20 dark:bg-seoul-blue-dark/70' : 'hover:bg-gray-100 dark:hover:bg-seoul-blue-dark/30'}`}>
        <img src={thread.avatarUrl} alt={thread.name} className="w-14 h-14 rounded-full" />
        <div className="ml-4 flex-grow">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{thread.name}</h3>
                <span className="text-xs text-gray-400">{thread.timestamp}</span>
            </div>
            <div className="flex justify-between items-center">
                <p className={`text-sm truncate ${thread.unread ? 'font-semibold text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>{thread.lastMessage}</p>
                {thread.unread && <div className="w-2.5 h-2.5 bg-seoul-ruby rounded-full flex-shrink-0 ml-2"></div>}
            </div>
        </div>
    </div>
);

const ChatView: React.FC<{ thread: MessageThread | null }> = ({ thread }) => {
    if (!thread) {
        return <div className="hidden md:flex flex-col h-full items-center justify-center bg-gray-50 dark:bg-seoul-blue-dark/20 text-gray-500 dark:text-gray-400">Select a conversation to start chatting.</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-seoul-blue-dark/50">
            <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center shadow-sm">
                <img src={thread.avatarUrl} alt={thread.name} className="w-10 h-10 rounded-full" />
                <h2 className="ml-4 font-bold text-xl text-gray-800 dark:text-white">{thread.name}</h2>
            </header>
            <main className="flex-grow p-4 overflow-y-auto space-y-4">
                {/* Mock messages */}
                <div className="flex justify-start"><div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg max-w-xs">Hey! Are you free this weekend?</div></div>
                <div className="flex justify-end"><div className="bg-seoul-blue text-white p-3 rounded-lg max-w-xs">I think so! What did you have in mind?</div></div>
                <div className="flex justify-start"><div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg max-w-xs">I was thinking we could check out that new cafe in Hongdae.</div></div>
                <div className="flex justify-end"><div className="bg-seoul-blue text-white p-3 rounded-lg max-w-xs">{thread.lastMessage}</div></div>
            </main>
            <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <input type="text" placeholder="Type a message..." className="w-full px-4 py-2 rounded-full border bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-seoul-blue" />
                    <button className="bg-seoul-blue text-white p-3 rounded-full flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></button>
                </div>
            </footer>
        </div>
    );
}

const Messages: React.FC = () => {
    const [activeThreadId, setActiveThreadId] = useState<number | null>(1);
    
    return (
        <div className="flex flex-col h-full">
            <div className="p-4">
                <PageHeader title="Messages" subtitle="Your conversations with your matches." />
            </div>
            <div className="flex-grow flex md:grid md:grid-cols-3 xl:grid-cols-4 overflow-hidden">
                <aside className="w-full md:w-auto border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-2 space-y-1">
                    {mockThreads.map(thread => (
                        <ThreadItem key={thread.id} thread={thread} isActive={thread.id === activeThreadId} onClick={() => setActiveThreadId(thread.id)} />
                    ))}
                </aside>
                <main className={`flex-grow md:col-span-2 xl:col-span-3 ${activeThreadId === null ? 'hidden md:block' : ''}`}>
                    <ChatView thread={mockThreads.find(t => t.id === activeThreadId) || null} />
                </main>
            </div>
        </div>
    );
};

export default Messages;