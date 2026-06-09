import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  NODE_COUNT,
  generateCodeBlockLayout,
  generateDispersedPositions,
  lerpPositions,
} from './geometryUtils';

interface Props {
  scrollRef: React.MutableRefObject<number>;
}

export default function MorphingWireframe({ scrollRef }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  // Pre-compute both target shapes
  const { codePos, spherePos, lineEdges, codeColors, morphed } = useMemo(() => {
    const block = generateCodeBlockLayout(42);
    const sp = generateDispersedPositions(42, 1.8);
    const m = new Float32Array(NODE_COUNT * 3);
    return {
      codePos: block.positions,
      spherePos: sp,
      lineEdges: block.lineEdges,
      codeColors: block.colors,
      morphed: m,
    };
  }, []);

  // Geometries — shared position + color buffers for points & lines
  const { lineGeo, pointGeo } = useMemo(() => {
    const posAttr = new THREE.BufferAttribute(
      new Float32Array(NODE_COUNT * 3),
      3,
    );
    posAttr.setUsage(THREE.DynamicDrawUsage);

    const colorAttr = new THREE.BufferAttribute(
      new Float32Array(codeColors),
      3,
    );

    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', posAttr);
    lg.setAttribute('color', colorAttr);
    lg.setIndex(new THREE.BufferAttribute(lineEdges, 1));

    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', posAttr);
    pg.setAttribute('color', colorAttr);

    return { lineGeo: lg, pointGeo: pg };
  }, [codeColors, lineEdges]);

  // Materials — vertexColors lets each code line show its syntax color
  const { lineMat, pointMat } = useMemo(() => {
    const lm = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pm = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    return { lineMat: lm, pointMat: pm };
  }, []);

  useFrame((_state, delta) => {
    const t = scrollRef.current; // 0..1

    // --- Morph positions ---
    lerpPositions(codePos, spherePos, t, morphed);
    const posArr = lineGeo.attributes.position as THREE.BufferAttribute;
    (posArr.array as Float32Array).set(morphed);
    posArr.needsUpdate = true;

    // --- Rotation ---
    const group = groupRef.current;
    group.rotation.y += delta * 0.05;
    group.rotation.x = -0.08 + t * 0.16;

    // --- Opacity ---
    // Lines fade out as they disperse (stretched lines look wrong)
    // Points stay visible throughout
    const midDip = 1 - Math.sin(t * Math.PI) * 0.35;
    const lineFade = 1 - t * 0.85; // 1.0 → 0.15
    lineMat.opacity = 0.3 * midDip * lineFade;
    pointMat.opacity = 0.5 * midDip;
  });

  return (
    <group ref={groupRef} position={[2.0, 0.15, 0]}>
      <lineSegments ref={lineRef} geometry={lineGeo} material={lineMat} />
      <points ref={pointsRef} geometry={pointGeo} material={pointMat} />
    </group>
  );
}
