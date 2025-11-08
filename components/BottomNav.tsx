
import React from 'react';
import { Page } from '../types';
import { AdminIcon, LifestyleIcon, FoodIcon, MeetMatchIcon, MessagesIcon, CommunityIcon, TransitIcon, ProfileIcon } from './Icons';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  { page: Page.Administration, Icon: AdminIcon },
  { page: Page.Lifestyle, Icon: LifestyleIcon },
  // Fix: Corrected typo 'page:g:' to 'page:'.
  { page: Page.Food, Icon: FoodIcon },
  { page: Page.MeetAndMatch, Icon: MeetMatchIcon },
  { page: Page.Messages, Icon: MessagesIcon },
  { page: Page.Community, Icon: CommunityIcon },
  { page: Page.Transit, Icon: TransitIcon },
  { page: Page.Profile, Icon: ProfileIcon },
];

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 bg-white/80 dark:bg-seoul-blue-dark/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="grid h-full grid-cols-4 md:grid-cols-8 max-w-5xl mx-auto">
        {navItems.map(({ page, Icon }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
              activePage === page ? 'text-seoul-blue dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-seoul-blue-light dark:hover:text-white'
            }`}
          >
            <Icon className={`w-6 h-6 ${activePage === page ? 'text-seoul-ruby' : ''}`} />
            <span className={`text-xs font-semibold font-poppins truncate ${activePage === page ? 'text-seoul-blue dark:text-white font-bold' : ''}`}>
              {page.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;