import { useEffect, useRef } from 'react';

const chars = [
  { char: '{', x: 12, y: 18, rotate: 15 },
  { char: '}', x: 185, y: 42, rotate: -20 },
  { char: '<', x: 45, y: 88, rotate: 10 },
  { char: '>', x: 160, y: 12, rotate: -5 },
  { char: '/', x: 90, y: 55, rotate: 25 },
  { char: '*', x: 130, y: 170, rotate: -15 },
  { char: '=', x: 20, y: 140, rotate: 0 },
  { char: ';', x: 170, y: 95, rotate: 30 },
  { char: ':', x: 75, y: 160, rotate: -10 },
  { char: '.', x: 110, y: 8, rotate: 5 },
  { char: '(', x: 55, y: 125, rotate: -25 },
  { char: ')', x: 145, y: 60, rotate: 20 },
  { char: '[', x: 8, y: 75, rotate: -30 },
  { char: ']', x: 195, y: 145, rotate: 12 },
  { char: '{', x: 100, y: 105, rotate: -8 },
  { char: '<', x: 35, y: 45, rotate: 22 },
  { char: '/', x: 150, y: 130, rotate: -18 },
  { char: '>', x: 80, y: 190, rotate: 8 },
  { char: '*', x: 120, y: 35, rotate: -12 },
  { char: ';', x: 60, y: 70, rotate: 28 },
  { char: '=', x: 175, y: 85, rotate: -22 },
  { char: ':', x: 25, y: 170, rotate: 16 },
  { char: '.', x: 140, y: 15, rotate: -6 },
  { char: '(', x: 95, y: 150, rotate: 35 },
  { char: ')', x: 15, y: 105, rotate: -28 },
  { char: '}', x: 165, y: 180, rotate: 10 },
  { char: '[', x: 50, y: 30, rotate: -15 },
  { char: ']', x: 115, y: 75, rotate: 18 },
  { char: '<', x: 180, y: 110, rotate: -20 },
  { char: '/', x: 70, y: 5, rotate: 12 },
];

function renderNoisePattern(): string {
  const size = 200;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.font = '8px monospace';
  ctx.fillStyle = 'rgba(255,255,255,1)';

  for (const c of chars) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotate * Math.PI) / 180);
    ctx.fillText(c.char, 0, 0);
    ctx.restore();
  }

  return canvas.toDataURL();
}

export default function NoiseOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const dataUrl = renderNoisePattern();
      ref.current.style.backgroundImage = `url(${dataUrl})`;
      ref.current.style.backgroundRepeat = 'repeat';
    }
  }, []);

  return <div ref={ref} className="noise-overlay" />;
}
