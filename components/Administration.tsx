import React, { useState, useMemo } from 'react';
import type { AdminTask } from '../types';
import { ChevronDownIcon, CheckIcon } from './Icons';
import PageHeader from './PageHeader';

const initialTasks: AdminTask[] = [
  { id: 1, title: 'Alien Registration Card (ARC)', description: ['Mandatory for stays over 90 days. Apply at your local immigration office.'], docs: ['Passport', 'Application Form', 'Proof of Residence', 'Certificate of Enrollment'], completed: true, deadline: 'Within 90 days of arrival', link: 'https://www.hikorea.go.kr', linkLabel: 'Visit HiKorea Website' },
  { 
    id: 2, 
    title: 'Get a Korean SIM Card', 
    description: [
      "Before ARC: You can get a pre-paid 'tourist' SIM card at the airport or phone stores with just your passport. These usually offer data, but calling/texting may be limited. An eSIM is a great option as you can set it up before you even land.",
      "After ARC: With an ARC, you can sign up for a monthly post-paid plan, which is often cheaper and offers better benefits like unlimited data. The main providers are SKT, KT, and LG U+.",
    ], 
    docs: ['Passport (for pre-paid)', 'ARC (for post-paid)'], 
    completed: true, 
    deadline: 'As soon as possible' 
  },
  { 
    id: 3, 
    title: 'T-Money/Cashbee Card', 
    description: [
        "This is a rechargeable card for all public transport (subway, bus, taxi) and many convenience stores. You can buy and recharge them at any subway station booth or convenience store, but remember that you must use cash for recharging.",
        "Alternatives: For heavy transit users in Seoul, the 'Climate Card' offers unlimited rides for a monthly fee. The 'WOWPASS' card combines a transit card with a prepaid debit card, which is great for tourists and short-term students."
    ], 
    docs: ['Cash for purchase and recharge'], 
    completed: false, 
    deadline: 'Upon arrival' 
  },
  { id: 4, title: 'National Health Insurance', description: ['Mandatory for all students staying over 6 months. You will be automatically enrolled after you receive your ARC.'], docs: ['ARC'], completed: false, deadline: 'After 6 months of stay', link: 'https://www.nhis.or.kr/english/wbhe/main.do', linkLabel: 'Learn about NHIS' },
];

const TaskItem: React.FC<{ task: AdminTask; onToggle: (id: number) => void; }> = ({ task, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-seoul-blue-dark/50 rounded-lg shadow-md mb-4 transition-all duration-300">
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task.id);
            }}
            className={`w-7 h-7 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center transition-colors duration-300 ${task.completed ? 'bg-seoul-blue border-seoul-blue' : 'bg-transparent border-gray-300 dark:border-gray-500'}`}
          >
            {task.completed && <CheckIcon className="w-5 h-5 text-white" />}
          </button>
          <span className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-seoul-blue-dark dark:text-white'}`}>{task.title}</span>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-2">
            {task.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Deadline:</h4>
            <p className="text-seoul-ruby text-sm">{task.deadline}</p>
          </div>
          <div className="mt-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Required Documents:</h4>
            <ul className="list-disc list-inside mt-1 text-gray-600 dark:text-gray-300">
              {task.docs.map((doc, index) => <li key={index}>{doc}</li>)}
            </ul>
          </div>
          {task.link && (
            <div className="mt-4">
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-seoul-blue hover:bg-seoul-blue-light text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 text-sm"
              >
                {task.linkLabel || 'Learn More'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Administration: React.FC = () => {
  const [tasks, setTasks] = useState<AdminTask[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const completionPercentage = useMemo(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    return (completedCount / tasks.length) * 100;
  }, [tasks]);

  return (
    <div className="p-4">
      <PageHeader title="Administration" subtitle="Your checklist for getting settled in Seoul." />
      
      <div className="my-6">
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-seoul-blue dark:text-white">Progress</span>
            <span className="text-sm font-medium text-seoul-blue dark:text-white">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-seoul-ruby h-2.5 rounded-full transition-all duration-500" style={{width: `${completionPercentage}%`}}></div>
        </div>
      </div>

      <div>
        {tasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} />)}
      </div>
    </div>
  );
};

export default Administration;