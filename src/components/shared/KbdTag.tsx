interface KbdTagProps {
  children: string;
  className?: string;
}

export default function KbdTag({ children, className = '' }: KbdTagProps) {
  return (
    <span className={`kbd-tag ${className}`}>
      {children}
    </span>
  );
}
