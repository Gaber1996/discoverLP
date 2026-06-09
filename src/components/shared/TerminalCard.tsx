import { type ReactNode } from 'react';

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalCard({ title = 'terminal', children, className = '' }: TerminalCardProps) {
  return (
    <div className={`glass-card rounded-xl overflow-hidden ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-text-muted text-xs font-mono ml-2">{title}</span>
      </div>
      {/* Body */}
      <div className="p-4 md:p-5 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}
