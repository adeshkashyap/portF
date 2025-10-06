import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

function Counter({ from = 0, to = 1000, suffix = "+" }: { from?: number; to: number; suffix?: string }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [from, to]);

  return <motion.span className="text-3xl md:text-4xl font-bold gradient-text">{value}{suffix}</motion.span>;
}

export default function ImpactMetrics() {
  const metrics = [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Delivered", value: 50, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <Card key={m.label} className="p-6 text-center glass-card">
          <div className="mb-2">
            <Counter to={m.value} suffix={m.suffix} />
          </div>
          <div className="text-sm text-muted-foreground">{m.label}</div>
        </Card>
      ))}
    </div>
  );
}
