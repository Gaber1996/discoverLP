import { type ReactNode } from 'react';
import GlassCard from './GlassCard';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features?: string[];
  className?: string;
}

export default function ServiceCard({ icon, title, description, features, className = '' }: ServiceCardProps) {
  return (
    <GlassCard className={`h-full ${className}`}>
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">{description}</p>
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
              <span className="text-syntax-green mt-0.5">›</span>
              {f}
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
