import React, { useState, useContext, useEffect } from 'react';
import PageHeader from './PageHeader';
import { useTheme, UserContext } from '../App';
import type { User, LanguageGoal } from '../types';

interface ProfileProps {
    onLogout: () => void;
}

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: () => void; }> = ({ label, enabled, onChange }) => (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-seoul-blue-dark/50 rounded-lg">
        <span className="font-semibold text-gray-700 dark:text-gray-200">{label}</span>
        <button
            onClick={onChange}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${enabled ? 'bg-seoul-blue' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const ProfileInput: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string}> = ({ label, name, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-seoul-blue focus:border-seoul-blue text-gray-900 dark:text-gray-200" />
    </div>
);

const ProfileSelect: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: readonly string[]}> = ({ label, name, value, onChange, options}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <select name={name} value={value} onChange={onChange} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-seoul-blue focus:border-seoul-blue text-gray-900 dark:text-gray-200">
            <option value="">Select...</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, updateUser } = useContext(UserContext);
    
    const [profileData, setProfileData] = useState<Partial<User>>({});

    useEffect(() => {
        if (user) {
            setProfileData(user);
        }
    }, [user]);

    if (!user) {
        return <div className="p-4">Loading profile...</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleHobbiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hobbies = e.target.value.split(',').map(h => h.trim());
        setProfileData(prev => ({ ...prev, hobbies }));
    };

    const handleSave = () => {
        updateUser(profileData as User);
        alert('Profile saved!');
    };
    
    const mbtiTypes = ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];
    const workStyles = ["Planner", "Procrastinator", "Go with the flow"];
    const socialStyles = ["Introvert", "Extrovert", "Ambivert"];
    const sportsOptions = ["Yes", "No", "Sometimes"];

  return (
    <div className="p-4 pb-12">
      <PageHeader title="My Profile" subtitle="Manage your settings and preferences." />
      
      <div className="mt-6 flex flex-col items-center">
        <img src={user.imageUrl} alt="User" className="w-28 h-28 rounded-full shadow-lg" />
        <h2 className="mt-4 text-2xl font-bold font-poppins text-seoul-blue-dark dark:text-white">{user.name}</h2>
        <p className="text-gray-500 dark:text-gray-300">{user.bio}</p>
        <button className="mt-2 text-sm font-semibold text-seoul-blue hover:underline">Edit Profile Info</button>
      </div>

       <div className="mt-8 space-y-4 p-4 bg-white dark:bg-seoul-blue-dark/50 rounded-lg">
           <h3 className="text-xl font-bold text-seoul-blue dark:text-white font-poppins mb-4">Your Matching Profile</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileSelect label="MBTI Personality" name="mbti" value={profileData.mbti || ''} onChange={handleInputChange} options={mbtiTypes} />
                <ProfileInput label="Hobbies (comma separated)" name="hobbies" value={profileData.hobbies?.join(', ') || ''} onChange={handleHobbiesChange} placeholder="e.g., K-Pop, Hiking, Cafes" />
                <ProfileSelect label="Study/Work Style" name="workStyle" value={profileData.workStyle || ''} onChange={handleInputChange} options={workStyles} />
                <ProfileSelect label="Social Style" name="socialStyle" value={profileData.socialStyle || ''} onChange={handleInputChange} options={socialStyles} />
                <ProfileSelect label="Do you like sports?" name="likesSports" value={profileData.likesSports || ''} onChange={handleInputChange} options={sportsOptions} />
           </div>
           <button onClick={handleSave} className="w-full mt-6 py-2 px-4 bg-seoul-ruby hover:bg-seoul-ruby-dark text-white font-bold rounded-md transition-colors duration-300">
            Save Matching Profile
           </button>
       </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 px-2">Settings</h3>
        <ToggleSwitch label="Dark Mode" enabled={theme === 'dark'} onChange={toggleTheme} />
        <ToggleSwitch label="Push Notifications" enabled={true} onChange={() => {}} />
        <ToggleSwitch label="Email Notifications" enabled={false}onChange={() => {}} />
      </div>

       <div className="mt-8 space-y-4">
        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 px-2">Account</h3>
        <button className="w-full text-left p-4 bg-white dark:bg-seoul-blue-dark/50 rounded-lg font-semibold text-gray-700 dark:text-gray-200">
            Language: English
        </button>
         <button 
            onClick={onLogout}
            className="w-full text-left p-4 bg-white dark:bg-seoul-blue-dark/50 rounded-lg font-semibold text-gray-700 dark:text-gray-200"
        >
            Logout
        </button>
        <button className="w-full text-left p-4 bg-white dark:bg-seoul-blue-dark/50 rounded-lg font-semibold text-seoul-ruby dark:text-red-400">
            Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;