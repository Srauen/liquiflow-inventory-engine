
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  variant?: 'default' | 'auth';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ variant = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.closest('button') || 
        target.closest('a') || 
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Cursor Styles
  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      scale: 1,
      mixBlendMode: 'difference' as any
    },
    auth: {
      height: 48,
      width: 48,
      backgroundColor: 'transparent',
      border: '1px dashed #00F0FF', // Neon Blue dashed
      scale: 1,
      mixBlendMode: 'normal' as any
    },
    hover: {
      height: 64,
      width: 64,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      scale: 1.1,
      mixBlendMode: 'difference' as any
    }
  };

  const centerOffset = isHovering ? 32 : (variant === 'auth' ? 24 : 16);

  return (
    <>
      <style>{`
        body, a, button, input, textarea, [role="button"] { 
          cursor: none !important; 
        }
      `}</style>
      
      {/* Main Ring Follower */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center backdrop-blur-[0.5px]"
        animate={{
          x: mousePosition.x - centerOffset,
          y: mousePosition.y - centerOffset,
          ...variants[isHovering ? 'hover' : variant]
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5
        }}
      >
        {/* Center Dot for Auth Mode */}
        {!isHovering && variant === 'auth' && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_10px_#00F0FF]" 
          />
        )}
        
        {/* Crosshair for Auth Mode */}
        {!isHovering && variant === 'auth' && (
           <>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-neon-blue/20"></div>
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-neon-blue/20"></div>
           </>
        )}

        {/* Center Dot for Default Mode - Always Visible for precision */}
        {variant === 'default' && (
          <motion.div 
            className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            animate={{ scale: isHovering ? 0 : 1 }}
          />
        )}
      </motion.div>

      {/* Trailing Dot (Optional polished feel) */}
      <motion.div 
         className="fixed top-0 left-0 z-[9998] pointer-events-none w-1 h-1 bg-white/50 rounded-full mix-blend-difference"
         animate={{
            x: mousePosition.x - 2,
            y: mousePosition.y - 2
         }}
         transition={{
            type: "tween",
            ease: "linear",
            duration: 0.1
         }}
      />
    </>
  );
};
