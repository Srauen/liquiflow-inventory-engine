
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'pink' | 'violet' | 'emerald' | 'blue';
  onClick?: (e: any) => void;
  hoverEffect?: boolean;
}

const colorMap = {
  pink: 'hover:border-neon-pink/50 hover:shadow-[0_0_30px_-5px_rgba(255,41,117,0.3)]',
  violet: 'hover:border-neon-violet/50 hover:shadow-[0_0_30px_-5px_rgba(140,30,255,0.3)]',
  emerald: 'hover:border-neon-emerald/50 hover:shadow-[0_0_30px_-5px_rgba(0,255,148,0.3)]',
  blue: 'hover:border-neon-blue/50 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.3)]',
};

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  onClick,
  hoverEffect = true
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        relative backdrop-blur-xl bg-[#121216]/70 border border-white/10 
        rounded-xl p-6 transition-all duration-300
        ${hoverEffect ? colorMap[glowColor] : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
