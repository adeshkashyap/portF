import { useMemo } from "react";
import Particles from "react-tsparticles";
import type { ISourceOptions } from "tsparticles-engine";

const ParticleBackground = () => {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: ["#a855f7", "#22d3ee"] },
        links: { enable: true, color: "#a855f7", distance: 150, opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [],
  );

  return <Particles className="absolute inset-0 -z-10 opacity-40" options={options} />;
};

export default ParticleBackground;
