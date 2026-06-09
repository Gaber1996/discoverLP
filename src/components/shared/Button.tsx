import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  arrow = false,
  className = '',
  onClick,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300 rounded-xl';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 hover:from-blue-500 hover:to-cyan-500 shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5',
    secondary:
      'border border-white/10 text-white px-6 py-3 hover:bg-white/5 hover:border-white/20 backdrop-blur-sm',
    ghost:
      'text-text-secondary hover:text-white px-4 py-2',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${classes}`} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`group ${classes}`} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={`group ${classes}`} onClick={onClick}>
      {content}
    </button>
  );
}
