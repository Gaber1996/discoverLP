interface CodeDecorationsProps {
  className?: string;
}

export default function CodeDecorations({ className = '' }: CodeDecorationsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Dotted circle */}
      <div className="absolute opacity-[0.08]" style={{ top: '12%', left: '5%' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 4" />
        </svg>
      </div>

      {/* Hexagon */}
      <div className="absolute opacity-[0.08]" style={{ top: '28%', right: '8%' }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <polygon points="26,2 48,15 48,37 26,50 4,37 4,15" stroke="#22d3ee" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Cross / plus */}
      <div className="absolute opacity-[0.08]" style={{ bottom: '25%', right: '12%' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <line x1="16" y1="4" x2="16" y2="28" stroke="#60a5fa" strokeWidth="1" />
          <line x1="4" y1="16" x2="28" y2="16" stroke="#60a5fa" strokeWidth="1" />
        </svg>
      </div>

      {/* Dot cluster */}
      <div className="absolute opacity-[0.08]" style={{ bottom: '15%', left: '7%' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="10" cy="10" r="2" fill="#22d3ee" />
          <circle cx="25" cy="10" r="2" fill="#60a5fa" />
          <circle cx="10" cy="25" r="2" fill="#60a5fa" />
          <circle cx="25" cy="25" r="2" fill="#22d3ee" />
          <circle cx="17.5" cy="17.5" r="2" fill="#60a5fa" />
        </svg>
      </div>

      {/* Concentric circles */}
      <div className="absolute opacity-[0.08]" style={{ top: '45%', left: '3%' }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="12" stroke="#22d3ee" strokeWidth="1" />
          <circle cx="28" cy="28" r="22" stroke="#60a5fa" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Connected nodes */}
      <div className="absolute opacity-[0.08]" style={{ top: '60%', right: '5%' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="15" r="4" stroke="#60a5fa" strokeWidth="1" />
          <circle cx="15" cy="35" r="4" stroke="#22d3ee" strokeWidth="1" />
          <circle cx="45" cy="35" r="4" stroke="#60a5fa" strokeWidth="1" />
          <line x1="30" y1="15" x2="15" y2="35" stroke="#60a5fa" strokeWidth="1" />
          <line x1="30" y1="15" x2="45" y2="35" stroke="#22d3ee" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
