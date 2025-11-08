
import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { Page, User } from './types';
import BottomNav from './components/BottomNav';
import Administration from './components/Administration';
import Lifestyle from './components/Lifestyle';
import Food from './components/Food';
import MeetAndMatch from './components/MeetAndMatch';
import Messages from './components/Messages';
import Community from './components/Community';
import Transit from './components/Transit';
import Profile from './components/Profile';
import AnimatedCloud from './components/AnimatedCloud';
import Auth from './components/Auth';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const UserContext = createContext<{ user: User | null; updateUser: (user: User) => void; }>({ user: null, updateUser: () => {} });


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme') as Theme | null;
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};


export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('seoulution_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [currentPage, setCurrentPage] = useState<Page>(Page.MeetAndMatch);

  const handleLogin = (email: string) => {
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const newUser: User = {
        name,
        email,
        bio: 'Exchange student exploring Seoul!',
        imageUrl: `https://i.pravatar.cc/150?u=${email}`,
        age: 21,
        nationality: 'American',
    };

    localStorage.setItem('seoulution_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('seoulution_user');
    setCurrentUser(null);
  };
  
  const handleUpdateUser = (updatedUser: User) => {
      setCurrentUser(updatedUser);
      localStorage.setItem('seoulution_user', JSON.stringify(updatedUser));
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.Administration:
        return <Administration />;
      case Page.Lifestyle:
        return <Lifestyle />;
      case Page.Food:
        return <Food />;
      case Page.MeetAndMatch:
        return <MeetAndMatch setActivePage={setCurrentPage} />;
      case Page.Messages:
        return <Messages />;
      case Page.Community:
        return <Community />;
      case Page.Transit:
        return <Transit />;
      case Page.Profile:
        return <Profile onLogout={handleLogout} />;
      default:
        return <Administration />;
    }
  };
  
  if (!currentUser) {
      return (
          <ThemeProvider>
              <Auth onLoginSuccess={handleLogin} />
          </ThemeProvider>
      );
  }

  return (
    <ThemeProvider>
      <UserContext.Provider value={{ user: currentUser, updateUser: handleUpdateUser }}>
        <div className="h-full w-full flex flex-col font-nunito-sans bg-brand-light dark:bg-seoul-blue-dark">
            <div className="relative flex-grow overflow-y-auto pb-24">
                <AnimatedCloud />
                {renderPage()}
            </div>
            <BottomNav activePage={currentPage} setActivePage={setCurrentPage} />
        </div>
      </UserContext.Provider>
    </ThemeProvider>
  );
}
