import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import React, { Suspense, useMemo, useState } from "react";

type BallProps = {
  color: string;
  position: [number, number, number];
  label: string;
  description: string;
};

function ServiceBall({ color, position, label, description }: BallProps) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const scale = hovered || active ? 1.15 : 1.0;
  const materialProps = useMemo(() => ({ color, metalness: 0.25, roughness: 0.2 }), [color]);

  return (
    <Float speed={1.0} rotationIntensity={0.6} floatIntensity={1.0}>
      <group position={position} scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = ""; }}
        onClick={(e) => { e.stopPropagation(); setActive((v) => !v); }}
      >
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial {...materialProps} emissive={hovered || active ? color : undefined} emissiveIntensity={hovered || active ? 0.2 : 0} />
        </mesh>
        {/* Base label */}
        <Html distanceFactor={10} position={[0, -1.1, 0]} center>
          <span className="text-xs md:text-sm px-2 py-1 rounded-md bg-black/50 text-white backdrop-blur-sm">
            {label}
          </span>
        </Html>
        {/* Tooltip on hover/click */}
        {(hovered || active) && (
          <Html distanceFactor={10} position={[0, 1.0, 0]} center>
            <div className="max-w-[180px] text-xs md:text-sm p-2 rounded-lg glass-card border border-border/60 shadow-lg">
              <div className="font-semibold mb-1">{label}</div>
              <div className="text-muted-foreground">{description}</div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

export default function ServiceSpheres3D() {
  const services: Array<{ label: string; description: string; color: string; pos: [number, number, number] }> = [
    { label: "APIs", description: "Secure REST/GraphQL APIs and rock-solid integrations.", color: "#22d3ee", pos: [-2, 0.5, 0] },
    { label: "AI", description: "Automation and chatbots that streamline operations.", color: "#a855f7", pos: [0, 1, -0.5] },
    { label: "DevOps", description: "Cloud infra, CI/CD, and scalable deployments.", color: "#34d399", pos: [2, 0.2, 0.4] },
  ];

  class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
      return { hasError: true };
    }
    componentDidCatch() {}
    render() {
      if (this.state.hasError) {
        return (
          <div className="w-full h-[320px] md:h-[420px] rounded-xl border border-border/60 glass-card flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-sm text-muted-foreground mb-2">Interactive preview unavailable on this device.</div>
              <div className="text-xs text-muted-foreground">3D preview requires WebGL. Content continues below.</div>
            </div>
          </div>
        );
      }
      return this.props.children as any;
    }
  }

  return (
    <div className="w-full h-[320px] md:h-[420px] rounded-xl border border-border/60 glass-card overflow-hidden">
      <ErrorBoundary>
        <Canvas frameloop="always" dpr={[1, 2]} camera={{ position: [0, 1.8, 4.2], fov: 50 }} gl={{ alpha: true, powerPreference: "high-performance", antialias: true }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={0.7} />
          <spotLight position={[-4, 5, 3]} intensity={0.6} angle={0.4} penumbra={0.8} />

          <Suspense fallback={null}>
            {services.map((s, i) => (
              <ServiceBall key={i} color={s.color} position={s.pos} label={s.label} description={s.description} />
            ))}
          </Suspense>

          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
