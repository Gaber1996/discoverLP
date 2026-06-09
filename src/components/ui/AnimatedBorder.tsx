import { type ReactNode } from 'react';

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  glow?: boolean;
  alwaysAnimate?: boolean;
  borderRadius?: string;
}

export default function AnimatedBorder({
  children,
  className = '',
  colors = ['#3b82f6', '#06b6d4', '#3b82f6'],
  glow = false,
  alwaysAnimate = false,
  borderRadius = '0.75rem',
}: AnimatedBorderProps) {
  const gradientColors = colors.join(', ');

  return (
    <div
      className={`group/border relative p-px ${className}`}
      style={{ borderRadius }}
    >
      {/* Animated border background */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from var(--gradient-angle, 0deg), ${gradientColors})`,
          animation: 'gradient-rotate 4s linear infinite',
          animationPlayState: alwaysAnimate ? 'running' : 'paused',
          borderRadius: 'inherit',
        }}
        onMouseEnter={(e) => {
          if (!alwaysAnimate) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running';
          }
        }}
        onMouseLeave={(e) => {
          if (!alwaysAnimate) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused';
          }
        }}
      />

      {/* Glow effect */}
      {glow && (
        <div
          className="absolute -inset-1 rounded-[inherit] opacity-0 group-hover/border:opacity-50 transition-opacity duration-500"
          style={{
            background: `conic-gradient(from var(--gradient-angle, 0deg), ${gradientColors})`,
            animation: 'gradient-rotate 4s linear infinite',
            animationPlayState: alwaysAnimate ? 'running' : 'paused',
            filter: 'blur(12px)',
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* Content */}
      <div className="relative rounded-[inherit]" style={{ borderRadius: `calc(${borderRadius} - 1px)` }}>
        {children}
      </div>
    </div>
  );
}
