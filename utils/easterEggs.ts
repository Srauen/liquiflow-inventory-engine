import React from 'react';

export const triggerEasterEgg = (e: React.MouseEvent<HTMLButtonElement | HTMLElement>) => {
  const target = e.currentTarget;
  const effects = [
    'skew-x-12', 
    'rotate-12', 
    'scale-110', 
    'translate-y-2', 
    'brightness-150',
    'sepia',
    'hue-rotate-90'
  ];
  const randomEffect = effects[Math.floor(Math.random() * effects.length)];
  
  // Apply temporary class
  target.classList.add('transition-transform', 'duration-200', randomEffect);
  
  // console log from "The System"
  const messages = [
    "System: Nice click.",
    "System: Optimizing liquidity...",
    "System: Access granted.",
    "System: 01001000 01101001",
    "System: Are you sure?",
    "System: Processing quantum thread...",
    "System: Stock liquidating..."
  ];
  if (Math.random() > 0.7) {
    console.log(`%c ${messages[Math.floor(Math.random() * messages.length)]}`, 'color: #00F0FF; background: #000; padding: 4px;');
  }

  setTimeout(() => {
    target.classList.remove(randomEffect);
  }, 300);
};