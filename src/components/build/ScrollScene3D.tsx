import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion, type MotionValue } from 'framer-motion';
import MorphingWireframe from './MorphingWireframe';

interface Props {
  scrollProgress: MotionValue<number>;
}

export default function ScrollScene3D({ scrollProgress }: Props) {
  const reduced = useReducedMotion();
  const scrollRef = useRef(0);

  // Bridge framer-motion MotionValue → plain ref (no re-renders)
  useEffect(() => {
    const unsub = scrollProgress.on('change', (v) => {
      scrollRef.current = v;
    });
    return unsub;
  }, [scrollProgress]);

  if (reduced) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <MorphingWireframe scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
