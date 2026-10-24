import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Clean 3D backdrop with tasteful accents.
 *
 * Principles that keep it from looking messy:
 *  - One animated wave grid as the base layer (depth, not noise)
 *  - A few SMALL wireframe accents parked at the screen edges, never over copy
 *  - Accents fade out on scroll, so content sections get a calm background
 *  - Low opacity + fog so nothing competes with the text
 */

type SceneProps = {
  isDark: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
};

/* ---------------- Wave grid ---------------- */

function WaveGrid({
  color,
  segmentsX,
  segmentsZ,
  animated,
  opacity,
}: {
  color: string;
  segmentsX: number;
  segmentsZ: number;
  animated: boolean;
  opacity: number;
}) {
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(70, 44, segmentsX, segmentsZ),
    [segmentsX, segmentsZ]
  );

  const base = useMemo(
    () => Float32Array.from(geometry.attributes.position.array as Float32Array),
    [geometry]
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!animated) return;
    const t = state.clock.elapsedTime;
    const pos = geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const z =
        Math.sin(x * 0.28 + t * 0.55) * 0.55 +
        Math.cos(y * 0.22 + t * 0.4) * 0.45;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.6, -8]}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
        fog
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------------- Sparse particles ---------------- */

function ParticleField({
  count,
  color,
  opacity,
}: {
  count: number;
  color: string;
  opacity: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------- Floating wireframe accents ---------------- */

type ShapeCfg = {
  geo: 'ico' | 'torus' | 'octa';
  position: [number, number, number];
  scale: number;
  rotSpeed: [number, number];
  floatAmp: number;
  floatSpeed: number;
  phase: number;
};

const DESKTOP_SHAPES: ShapeCfg[] = [
  {
    geo: 'ico',
    position: [-5.1, 3.1, -2.5],
    scale: 0.5,
    rotSpeed: [0.09, 0.13],
    floatAmp: 0.22,
    floatSpeed: 0.4,
    phase: 0,
  },
  {
    geo: 'octa',
    position: [5.2, 3.2, -3],
    scale: 0.42,
    rotSpeed: [0.12, 0.08],
    floatAmp: 0.18,
    floatSpeed: 0.5,
    phase: 2,
  },
  {
    geo: 'torus',
    position: [5.0, -2.7, -1.5],
    scale: 0.5,
    rotSpeed: [0.07, 0.11],
    floatAmp: 0.2,
    floatSpeed: 0.35,
    phase: 4,
  },
];

const MOBILE_SHAPES: ShapeCfg[] = [
  {
    geo: 'ico',
    position: [-2.3, 3.4, -3],
    scale: 0.38,
    rotSpeed: [0.08, 0.11],
    floatAmp: 0.16,
    floatSpeed: 0.4,
    phase: 0,
  },
  {
    geo: 'octa',
    position: [2.3, 3.4, -3],
    scale: 0.34,
    rotSpeed: [0.1, 0.07],
    floatAmp: 0.14,
    floatSpeed: 0.5,
    phase: 2,
  },
];

function FloatingShape({
  cfg,
  color,
  opacity,
  animated,
}: {
  cfg: ShapeCfg;
  color: string;
  opacity: number;
  animated: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const baseY = cfg.position[1];

  const geometry = useMemo(() => {
    switch (cfg.geo) {
      case 'torus':
        return new THREE.TorusGeometry(1, 0.3, 8, 22);
      case 'octa':
        return new THREE.OctahedronGeometry(1, 0);
      default:
        return new THREE.IcosahedronGeometry(1, 0);
    }
  }, [cfg.geo]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!meshRef.current || !matRef.current) return;

    if (animated) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y =
        baseY + Math.sin(t * cfg.floatSpeed + cfg.phase) * cfg.floatAmp;
      meshRef.current.rotation.x += delta * cfg.rotSpeed[0];
      meshRef.current.rotation.y += delta * cfg.rotSpeed[1];
    }

    // Fade the accents away once the user scrolls past the hero.
    const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.85));
    matRef.current.opacity = opacity * fade;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={cfg.position}
      scale={cfg.scale}
    >
      <meshBasicMaterial
        ref={matRef}
        color={color}
        wireframe
        transparent
        opacity={opacity}
        fog
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------------- Mouse parallax ---------------- */

function Rig({ enabled }: { enabled: boolean }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled]);

  useFrame(() => {
    if (!enabled) return;
    current.current.x += (target.current.x - current.current.x) * 0.035;
    current.current.y += (target.current.y - current.current.y) * 0.035;
    camera.position.x = current.current.x;
    camera.position.y = 0.6 - current.current.y;
    camera.lookAt(0, -0.6, 0);
  });

  return null;
}

/* ---------------- Scene ---------------- */

export default function Scene3D({ isDark, reducedMotion, isMobile }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause rendering when the tab is hidden or the section is off-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let inView = true;
    let hidden = document.hidden;

    const update = () => {
      const canvas = el.querySelector('canvas');
      if (!canvas) return;
      canvas.style.visibility = inView && !hidden ? 'visible' : 'hidden';
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    io.observe(el);

    const onVis = () => {
      hidden = document.hidden;
      update();
    };
    document.addEventListener('visibilitychange', onVis);
    const t = window.setTimeout(update, 120);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.clearTimeout(t);
    };
  }, []);

  const accent = isDark ? '#34d399' : '#059669';
  const fogColor = isDark ? '#080b0e' : '#f7f9fa';
  const animated = !reducedMotion;
  const shapes = isMobile ? MOBILE_SHAPES : DESKTOP_SHAPES;
  const shapeOpacity = isDark ? 0.22 : 0.16;

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.6, 7], fov: 55 }}
        dpr={isMobile ? 1 : [1, 1.75]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        {/* Fog fades distant elements into the page background */}
        <fog attach="fog" args={[fogColor, 7, 26]} />

        <ambientLight intensity={isDark ? 0.7 : 1} />

        <WaveGrid
          color={accent}
          segmentsX={isMobile ? 26 : 46}
          segmentsZ={isMobile ? 16 : 30}
          animated={animated}
          opacity={isDark ? 0.16 : 0.1}
        />

        <ParticleField count={isMobile ? 60 : 140} color={accent} opacity={isDark ? 0.4 : 0.3} />

        {shapes.map((cfg, i) => (
          <FloatingShape
            key={`${cfg.geo}-${i}`}
            cfg={cfg}
            color={accent}
            opacity={shapeOpacity}
            animated={animated}
          />
        ))}

        <Rig enabled={animated && !isMobile} />
      </Canvas>
    </div>
  );
}
