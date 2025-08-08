import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollPercentage(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 h-64 w-2 bg-gray-200 rounded-full">
      <div 
        className="bg-blue-500 w-full rounded-full transition-all duration-300"
        style={{ height: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
}