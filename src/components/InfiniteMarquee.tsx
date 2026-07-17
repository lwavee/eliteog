import React from 'react';

interface InfiniteMarqueeProps {
  items: React.ReactNode[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
}

export default function InfiniteMarquee({ items, speed = 'normal', direction = 'left' }: InfiniteMarqueeProps) {
  // Speed mapping
  const speedClass = 
    speed === 'slow' ? 'animate-[scroll_40s_linear_infinite]' : 
    speed === 'fast' ? 'animate-[scroll_20s_linear_infinite]' : 
    'animate-scroll';
  
  // Create a duplicated array for seamless looping
  const scrollItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden relative flex py-4">
      {/* Left/Right fading gradients for smooth entry/exit */}
      <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <div 
        className={`flex w-max gap-8 md:gap-16 ${speedClass} ${direction === 'right' ? '[animation-direction:reverse]' : ''}`}
      >
        {scrollItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 flex items-center justify-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
