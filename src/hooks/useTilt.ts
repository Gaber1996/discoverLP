import { useCallback, useRef, useState } from 'react';

interface TiltStyle {
  transform: string;
  transition: string;
}

interface ShineStyle {
  background: string;
  opacity: number;
  transition: string;
}

export default function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<TiltStyle>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
  });
  const [shineStyle, setShineStyle] = useState<ShineStyle>({
    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = ((centerY - y) / centerY) * maxTilt;
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transition: 'transform 0.1s ease',
      });
      setShineStyle({
        background: `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.2), transparent 60%)`,
        opacity: 1,
        transition: 'opacity 0.1s ease',
      });
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
    });
    setShineStyle({
      background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
    });
  }, []);

  return { ref, onMouseMove, onMouseLeave, tiltStyle, shineStyle };
}
