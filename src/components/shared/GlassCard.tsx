import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-xl p-6 md:p-8 ${
        hover ? 'hover:border-white/10 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
