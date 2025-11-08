
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <header className="px-4 pt-8 pb-4">
    <h1 className="text-3xl font-bold font-poppins text-seoul-blue dark:text-white">{title}</h1>
    <p className="text-gray-500 dark:text-gray-300 mt-1">{subtitle}</p>
  </header>
);

export default PageHeader;