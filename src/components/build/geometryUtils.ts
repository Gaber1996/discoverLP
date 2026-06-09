/**
 * Geometry utilities for the holographic code block.
 *
 * Shape A — vertices arranged as a floating code snippet with syntax-colored lines
 * Shape B — same vertices dispersed into a Fibonacci sphere (code "exploding" into particles)
 * Edges  — pairs connecting left+right endpoints of each code line
 */

export const NODE_COUNT = 140;

// ── Seeded PRNG (Mulberry32) ────────────────────────────────────────

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Code structure ──────────────────────────────────────────────────

interface CodeLineSpec {
  indent: number;
  frac: number; // 0-1 of available width
  type: string; // key into SYNTAX_RGB
}

// Each entry is a line of code; null = blank line (vertical spacing only).
// Represents a realistic React component.
const CODE_LINES: (CodeLineSpec | null)[] = [
  { indent: 0, frac: 0.72, type: 'keyword' }, // import { useState } from 'react'
  { indent: 0, frac: 0.80, type: 'keyword' }, // import { motion } from 'framer-motion'
  null,
  { indent: 0, frac: 0.64, type: 'func' }, // export function BuildPage() {
  { indent: 1, frac: 0.84, type: 'keyword' }, // const [data, setData] = useState([])
  { indent: 1, frac: 0.72, type: 'keyword' }, // const isReady = useQuery('projects')
  null,
  { indent: 1, frac: 0.44, type: 'func' }, // useEffect(() => {
  { indent: 2, frac: 0.64, type: 'func' }, //   fetchData().then(res => {
  { indent: 3, frac: 0.50, type: 'string' }, //     setData(res.data)
  { indent: 3, frac: 0.46, type: 'string' }, //     setReady(true)
  { indent: 2, frac: 0.12, type: 'plain' }, //   })
  { indent: 1, frac: 0.18, type: 'plain' }, // }, [])
  null,
  { indent: 1, frac: 0.70, type: 'keyword' }, // if (!isReady) return <Loader />
  null,
  { indent: 1, frac: 0.24, type: 'keyword' }, // return (
  { indent: 2, frac: 0.46, type: 'tag' }, //   <motion.div layout>
  { indent: 3, frac: 0.50, type: 'tag' }, //     <Hero title="Build" />
  { indent: 3, frac: 0.56, type: 'tag' }, //     {data.map(item => (
  { indent: 4, frac: 0.66, type: 'tag' }, //       <Card key={item.id} />
  { indent: 3, frac: 0.14, type: 'plain' }, //     ))}
  { indent: 3, frac: 0.30, type: 'tag' }, //     <Footer />
  { indent: 2, frac: 0.40, type: 'tag' }, //   </motion.div>
  { indent: 1, frac: 0.10, type: 'plain' }, //   )
  { indent: 0, frac: 0.06, type: 'plain' }, // }
];

// Syntax highlighting palette (linear RGB, 0-1)
const SYNTAX_RGB: Record<string, [number, number, number]> = {
  keyword: [0.231, 0.51, 0.965], // #3B82F6 blue
  string: [0.29, 0.871, 0.502], // #4ADE80 green
  tag: [0.984, 0.573, 0.235], // #FB923C orange
  func: [0.753, 0.518, 0.988], // #C084FC purple
  plain: [0.58, 0.639, 0.722], // #94A3B8 gray
};

const LINE_SPACING = 0.12;
const INDENT_SIZE = 0.20;
const MAX_WIDTH = 2.4;
const HALF_WIDTH = MAX_WIDTH / 2;

// ── Shape A: code block layout ──────────────────────────────────────

export interface CodeBlockResult {
  positions: Float32Array;
  colors: Float32Array;
  lineEdges: Uint16Array;
}

export function generateCodeBlockLayout(seed = 42): CodeBlockResult {
  const rng = mulberry32(seed);

  const nonBlank = CODE_LINES.filter(
    (l): l is CodeLineSpec => l !== null,
  );
  const lineVertexCount = nonBlank.length * 2;
  const dotCount = NODE_COUNT - lineVertexCount;

  const positions = new Float32Array(NODE_COUNT * 3);
  const colors = new Float32Array(NODE_COUNT * 3);
  const edges: number[] = [];

  const totalRows = CODE_LINES.length;
  const totalHeight = (totalRows - 1) * LINE_SPACING;
  const startY = totalHeight / 2;

  let vi = 0; // vertex index
  let row = 0;

  for (const line of CODE_LINES) {
    const y = startY - row * LINE_SPACING;
    row++;
    if (line === null) continue;

    const avail = MAX_WIDTH - line.indent * INDENT_SIZE;
    const len = line.frac * avail;
    const xStart = -HALF_WIDTH + line.indent * INDENT_SIZE;
    const xEnd = xStart + len;
    const z = (rng() - 0.5) * 0.08;
    const yJitter = (rng() - 0.5) * 0.01;
    const [r, g, b] = SYNTAX_RGB[line.type];

    // Left endpoint
    const li = vi * 3;
    positions[li] = xStart;
    positions[li + 1] = y + yJitter;
    positions[li + 2] = z;
    colors[li] = r;
    colors[li + 1] = g;
    colors[li + 2] = b;

    // Right endpoint
    const ri = (vi + 1) * 3;
    positions[ri] = xEnd;
    positions[ri + 1] = y + yJitter;
    positions[ri + 2] = z;
    colors[ri] = r;
    colors[ri + 1] = g;
    colors[ri + 2] = b;

    edges.push(vi, vi + 1);
    vi += 2;
  }

  // Floating token dots — scattered around the code block like drifting characters
  const colorKeys = Object.keys(SYNTAX_RGB);
  for (let i = 0; i < dotCount; i++) {
    const pi = vi * 3;
    positions[pi] = -HALF_WIDTH + rng() * MAX_WIDTH;
    positions[pi + 1] = startY - rng() * totalHeight;
    positions[pi + 2] = (rng() - 0.5) * 0.5;

    // Random syntax color, dimmed
    const ck = colorKeys[Math.floor(rng() * colorKeys.length)];
    const [r, g, b] = SYNTAX_RGB[ck];
    const dim = 0.25 + rng() * 0.35; // 25-60 % brightness
    colors[pi] = r * dim;
    colors[pi + 1] = g * dim;
    colors[pi + 2] = b * dim;

    vi++;
  }

  return {
    positions,
    colors,
    lineEdges: new Uint16Array(edges),
  };
}

// ── Shape B: Fibonacci sphere dispersal ─────────────────────────────

export function generateDispersedPositions(
  seed = 42,
  radius = 1.8,
): Float32Array {
  const rng = mulberry32(seed + 999);
  const pos = new Float32Array(NODE_COUNT * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const r = radius * (0.85 + rng() * 0.3);

    const idx = i * 3;
    pos[idx] = Math.cos(theta) * radiusAtY * r;
    pos[idx + 1] = y * r;
    pos[idx + 2] = Math.sin(theta) * radiusAtY * r;
  }

  return pos;
}

// ── Lerp (zero-allocation) ──────────────────────────────────────────

export function lerpPositions(
  a: Float32Array,
  b: Float32Array,
  t: number,
  out: Float32Array,
): void {
  for (let i = 0, l = a.length; i < l; i++) {
    out[i] = a[i] + (b[i] - a[i]) * t;
  }
}
