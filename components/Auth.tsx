
import React, { useState } from 'react';
import { CommunityIcon } from './Icons';
import { useTheme } from '../App';

interface AuthProps {
    onLoginSuccess: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically validate and send credentials to a server
        // For this demo, we'll just simulate a successful login/signup
        if (email && password) {
            onLoginSuccess(email);
        } else {
            alert('Please enter an email and password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-full bg-brand-light dark:bg-seoul-blue-dark p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <CommunityIcon className={`w-20 h-20 mx-auto ${theme === 'dark' ? 'text-white' : 'text-seoul-blue'}`} />
                    <h1 className="text-4xl font-bold font-poppins text-seoul-blue dark:text-white mt-4">Seoulution</h1>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Your journey in Seoul starts here.</p>
                </div>
                
                <div className="bg-white dark:bg-seoul-blue-dark/50 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-seoul-blue-dark dark:text-white mb-6">{isLogin ? 'Sign In' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-seoul-blue focus:border-seoul-blue sm:text-sm text-gray-900 dark:text-gray-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-seoul-blue focus:border-seoul-blue sm:text-sm text-gray-900 dark:text-gray-200"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-seoul-blue hover:bg-seoul-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seoul-blue-light transition-colors duration-300"
                            >
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-medium text-seoul-blue-light dark:text-blue-400 hover:underline">
                            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;