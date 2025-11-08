
import React, { useState, useEffect } from 'react';

const AnimatedCloud: React.FC = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(scrollY / 300, 0.1); // Max opacity of 10%
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-20 right-0 z-0 transition-opacity duration-500 pointer-events-none"
      style={{ opacity }}
    >
      <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M199.5 66C199.5 82.2893 186.039 95.5 169.5 95.5C158.423 95.5 148.654 89.6866 143.435 80.9388C138.802 85.3901 132.893 88.25 126.25 88.25C113.111 88.25 102.5 77.6386 102.5 64.5C102.5 62.4734 102.775 60.513 103.268 58.6499C94.2144 55.4526 87.75 46.801 87.75 36.75C87.75 23.6114 98.3614 13 111.5 13C114.77 13 117.848 13.7254 120.565 15.0183C126.883 6.32486 136.93 0.5 148.25 0.5C163.844 0.5 176.5 13.1558 176.5 28.75C176.5 29.6641 176.444 30.5658 176.337 31.4552C189.652 35.0991 199.5 46.9174 199.5 60V66Z" fill="#023E8A" fillOpacity="0.5"/>
      </svg>
    </div>
  );
};

export default AnimatedCloud;