import React, { useState, useEffect } from 'react';

const ChangingText = () => {
  const texts = [
    'video rendering?',
    'web hosting?',
    'file downloading?',
    'playing games?',
    'hosting a server?',
    'good PCs?'
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div
      className="overflow-hidden relative"
      style={{ height: '15rem', lineHeight: '15rem', paddingBottom: '16rem' }}
    >
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${index * 15}rem)`,
        }}
      >
        {texts.map((text, i) => (
          <div
            key={i}
            className="h-12 flex items-center justify-center"
            style={{
              height: '15rem',
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-500 dark:via-purple-400 dark:to-indigo-500">
              {text}
            </span>
          </div>
        ))}
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--tw-bg-opacity, 1) rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 1))',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none dark:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 1))',
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none hidden dark:block"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1))',
          }}
        />
      </div>
    </div>
    
  );
};

export default ChangingText;
