
import React, { useState } from 'react';
import PageHeader from './PageHeader';
import { getGeminiTip } from '../services/geminiService';
import { SparklesIcon } from './Icons';

const LifestyleTip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-seoul-blue-dark/50 p-5 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-bold font-poppins text-seoul-blue dark:text-white mb-2">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

const Lifestyle: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [tip, setTip] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTip = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setTip('');
    const response = await getGeminiTip(prompt);
    setTip(response);
    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <PageHeader title="Lifestyle" subtitle="Practical advice for everyday life in Seoul." />
        
      <div className="mt-4">
        <div className="bg-seoul-blue text-white p-5 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-bold font-poppins flex items-center"><SparklesIcon className="w-6 h-6 mr-2 text-yellow-300"/>Get a Custom Tip!</h3>
            <p className="mt-2 text-seoul-blue/100 dark:text-gray-200">Curious about something specific? Ask our AI for a tip!</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'gift-giving etiquette'"
                    className="w-full px-4 py-2 rounded-md border-0 text-gray-800 focus:ring-2 focus:ring-seoul-ruby"
                />
                <button
                    onClick={handleGetTip}
                    disabled={isLoading}
                    className="bg-seoul-ruby hover:bg-seoul-ruby-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-400"
                >
                    {isLoading ? 'Thinking...' : 'Get Tip'}
                </button>
            </div>
            {isLoading && <div className="mt-4 text-center text-gray-200">Loading your tip...</div>}
            {tip && (
                <div className="mt-4 p-4 bg-seoul-blue-light/20 rounded-md">
                    <p className="text-white whitespace-pre-wrap">{tip}</p>
                </div>
            )}
        </div>
        
        <LifestyleTip title="Sports & Fitness">
            <p><strong>University Gyms:</strong> Most universities have their own gyms with affordable student memberships. Check your campus facilities first!</p>
            <p><strong>Local Gyms (헬스장):</strong> You'll find private gyms everywhere. They often offer short-term memberships, but be prepared for a sign-up fee.</p>
            <p><strong>Outdoor Activities:</strong> Seoul is surrounded by mountains perfect for hiking, like Bukhansan or Gwanaksan. Many parks, like the Han River Park, have free outdoor exercise equipment and sports facilities.</p>
        </LifestyleTip>
        <LifestyleTip title="Recycling (분리수거)">
            <p>Korea has a strict recycling system. Separate plastics, paper, cans, glass, and food waste into designated bags or bins. Check your building's rules for collection days!</p>
        </LifestyleTip>
        <LifestyleTip title="Public Wi-Fi">
            <p>Free Wi-Fi is widely available on subways, buses, and public spaces (look for "Seoul_Secure" or "IPTime"). It's fast and reliable, keeping you connected on the go.</p>
        </LifestyleTip>
        <LifestyleTip title="Cultural Norms: Age & Hierarchy">
            <p>Age is very important in Korean society. It's common to be asked your age to establish social hierarchy. Use polite language and gestures (like pouring drinks with two hands) with those older than you.</p>
        </LifestyleTip>
      </div>
    </div>
  );
};

export default Lifestyle;