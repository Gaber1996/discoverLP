interface FloatingShapesProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const tokens = [
  { text: '</>', left: '6%', top: '12%', size: 36, color: 'text-primary', animation: 'float-rotate-3d', duration: '28s', delay: '0s' },
  { text: '{ }', left: '85%', top: '8%', size: 30, color: 'text-syntax-green', animation: 'sphere-float', duration: '22s', delay: '-3s' },
  { text: '=>', left: '92%', top: '45%', size: 34, color: 'text-syntax-purple', animation: 'float-rotate-3d', duration: '32s', delay: '-7s' },
  { text: '::', left: '4%', top: '55%', size: 24, color: 'text-accent', animation: 'sphere-float', duration: '26s', delay: '-5s' },
  { text: '[ ]', left: '78%', top: '70%', size: 28, color: 'text-primary', animation: 'float-rotate-3d', duration: '35s', delay: '-12s' },
  { text: '&&', left: '15%', top: '80%', size: 22, color: 'text-syntax-green', animation: 'sphere-float', duration: '20s', delay: '-8s' },
  { text: '??', left: '50%', top: '5%', size: 26, color: 'text-syntax-purple', animation: 'float-rotate-3d', duration: '30s', delay: '-4s' },
  { text: '( )', left: '40%', top: '90%', size: 32, color: 'text-accent', animation: 'sphere-float', duration: '24s', delay: '-10s' },
];

export default function FloatingShapes({ className = '' }: FloatingShapesProps) {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block ${className}`}>
      {tokens.map((token, i) => (
        <span
          key={i}
          className={`absolute font-mono ${token.color} opacity-[0.10]`}
          style={{
            left: token.left,
            top: token.top,
            fontSize: token.size,
            animation: `${token.animation} ${token.duration} ease-in-out infinite`,
            animationDelay: token.delay,
            willChange: 'transform',
          }}
        >
          {token.text}
        </span>
      ))}
    </div>
  );
}
