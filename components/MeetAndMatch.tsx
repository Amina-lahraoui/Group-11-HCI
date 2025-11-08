import React, { useState, useContext, useMemo } from 'react';
import PageHeader from './PageHeader';
import { UserContext } from '../App';
import { Page } from '../types';
import { mockUsers } from '../data/mockUsers';
import { findBestMatch } from '../services/geminiService';
import { SparklesIcon } from './Icons';

interface MeetAndMatchProps {
    setActivePage: (page: Page) => void;
}

const MatchCard: React.FC<{ profile: import('../types').User }> = ({ profile }) => (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-300 dark:bg-gray-700 animate-fade-in">
        <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent p-6 text-white flex flex-col justify-end">
            <h2 className="text-3xl font-bold font-poppins">{profile.name}, {profile.age}</h2>
            <p className="text-lg">{profile.nationality}</p>
            <p className="mt-2 text-sm opacity-90">{profile.bio}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {profile.hobbies?.slice(0, 3).map(interest => (
                    <span key={interest} className="bg-white/20 text-white px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm">{interest}</span>
                ))}
            </div>
        </div>
    </div>
);

const MeetAndMatch: React.FC<MeetAndMatchProps> = ({ setActivePage }) => {
    const { user: currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [match, setMatch] = useState<import('../types').User | null>(null);
    const [analysis, setAnalysis] = useState<string>('');
    const [seenEmails, setSeenEmails] = useState<string[]>([]);

    const isProfileComplete = useMemo(() => {
        return currentUser && currentUser.mbti && currentUser.hobbies?.length;
    }, [currentUser]);
    
    const handleFindMatch = async () => {
        if (!currentUser) return;
        setIsLoading(true);
        setError(null);
        setMatch(null);
        setAnalysis('');

        try {
            const potentialMatches = mockUsers.filter(u => u.email !== currentUser.email && !seenEmails.includes(u.email));
            if (potentialMatches.length === 0) {
                setError("You've seen all available profiles! Check back later.");
                setIsLoading(false);
                return;
            }

            const result = await findBestMatch(currentUser, potentialMatches);
            if (result) {
                setMatch(result.match);
                setAnalysis(result.analysis);
                setSeenEmails(prev => [...prev, result.match.email]);
            } else {
                 setError("Couldn't find a suitable match right now. Try adjusting your profile!");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (!isProfileComplete) {
            return (
                <div className="text-center p-8 bg-white dark:bg-seoul-blue-dark/50 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold font-poppins text-seoul-blue-dark dark:text-white">Find Your Friends!</h3>
                    <p className="text-gray-500 dark:text-gray-300 mt-2 mb-6">Complete your matching profile to connect with other students who share your vibe.</p>
                    <button onClick={() => setActivePage(Page.Profile)} className="bg-seoul-ruby text-white font-bold py-3 px-6 rounded-full transition-transform hover:scale-105">
                        Complete Profile
                    </button>
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <SparklesIcon className="w-16 h-16 text-seoul-blue dark:text-white animate-pulse mx-auto" />
                    <h3 className="text-xl font-bold font-poppins text-seoul-blue-dark dark:text-white mt-4">Finding your Seoul-mate...</h3>
                    <p className="text-gray-500 dark:text-gray-300 mt-2">Our AI is analyzing cosmic connections!</p>
                </div>
            );
        }

        if (error) {
            return <div className="text-center p-8 bg-red-100 dark:bg-red-900/50 rounded-2xl shadow-lg text-seoul-ruby dark:text-red-300">{error}</div>;
        }

        if (match) {
            return (
                <div className="w-full">
                    <div className="w-full max-w-sm h-[65vh] max-h-[450px] mx-auto">
                        <MatchCard profile={match} />
                    </div>
                    <div className="mt-6 p-4 bg-white dark:bg-seoul-blue-dark/50 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-bold font-poppins text-seoul-blue dark:text-white flex items-center gap-2"><SparklesIcon className="w-6 h-6 text-yellow-400" /> Why you're a good match:</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{analysis}</p>
                    </div>
                </div>
            );
        }

        return (
             <div className="text-center p-8">
                <h3 className="text-2xl font-bold font-poppins text-seoul-blue-dark dark:text-white">Ready to Meet Someone?</h3>
                <p className="text-gray-500 dark:text-gray-300 mt-2 mb-6">Click the button below and our AI will find the best connection for you.</p>
                <button onClick={handleFindMatch} className="bg-seoul-blue hover:bg-seoul-blue-light text-white font-bold py-4 px-8 text-lg rounded-full transition-transform hover:scale-105 shadow-lg">
                    ✨ Find a Friend!
                </button>
            </div>
        );
    }

  return (
    <div className="flex flex-col h-full p-4">
      <PageHeader title="Meet & Match" subtitle="Connect with students and make new friends." />
      
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        {renderContent()}
      </div>
      
      {isProfileComplete && match && (
        <div className="flex justify-center items-center gap-4 mt-4">
            <button onClick={handleFindMatch} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105">
                Find Another Match
            </button>
            <button className="bg-seoul-ruby text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105">
                Message {match.name}
            </button>
        </div>
      )}
      {/* Add a dedicated, large spacer to push content above the bottom nav bar */}
      <div className="flex-shrink-0 h-32" />
    </div>
  );
};

export default MeetAndMatch;