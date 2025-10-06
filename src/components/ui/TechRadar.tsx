import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TechRadar = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: "Node.js", level: 95, category: "Backend", angle: 0 },
    { name: "React", level: 90, category: "Frontend", angle: 45 },
    { name: "MongoDB", level: 85, category: "Database", angle: 90 },
    { name: "Docker", level: 80, category: "DevOps", angle: 135 },
    { name: "AI/ML", level: 75, category: "AI", angle: 180 },
    { name: "GraphQL", level: 85, category: "Backend", angle: 225 },
    { name: "AWS", level: 80, category: "Cloud", angle: 270 },
    { name: "Laravel", level: 90, category: "Backend", angle: 315 },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Backend: "hsl(262, 83%, 58%)",
      Frontend: "hsl(186, 94%, 50%)",
      Database: "hsl(280, 100%, 70%)",
      DevOps: "hsl(220, 90%, 60%)",
      AI: "hsl(340, 75%, 55%)",
      Cloud: "hsl(150, 70%, 50%)",
    };
    return colors[category] || "hsl(262, 83%, 58%)";
  };

  return (
    <section id="tech-radar" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Technology <span className="gradient-text">Radar</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Interactive visualization of our core competencies
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            {/* Radar circles */}
            <svg className="w-full h-full" viewBox="0 0 400 400">
              {[25, 50, 75, 100].map((percent, i) => (
                <circle
                  key={i}
                  cx="200"
                  cy="200"
                  r={percent * 1.5}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity={0.3}
                />
              ))}
              
              {/* Radar lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos((angle * Math.PI) / 180) * 150}
                  y2={200 + Math.sin((angle * Math.PI) / 180) * 150}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity={0.3}
                />
              ))}

              {/* Skill points */}
              {skills.map((skill, index) => {
                const radius = (skill.level / 100) * 150;
                const x = 200 + Math.cos((skill.angle * Math.PI) / 180) * radius;
                const y = 200 + Math.sin((skill.angle * Math.PI) / 180) * radius;

                // Tooltip sizing and clamping within the 400x400 viewBox
                const padding = 8;
                const approxNameWidth = Math.max(skill.name.length * 7, 80);
                const infoText = `${skill.level}% • ${skill.category}`;
                const approxInfoWidth = Math.max(infoText.length * 6, 80);
                const tooltipWidth = Math.max(approxNameWidth, approxInfoWidth) + padding * 2; // px
                const tooltipHeight = 34; // px for two lines
                const margin = 8; // keep some margin from edges
                const clampedCenterX = Math.min(400 - margin - tooltipWidth / 2, Math.max(margin + tooltipWidth / 2, x));
                const clampedTopY = Math.min(400 - margin - tooltipHeight - 6, Math.max(margin, y - tooltipHeight - 10));

                return (
                  <g key={skill.name}>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={hoveredSkill === skill.name ? 8 : 6}
                      fill={getCategoryColor(skill.category)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="cursor-pointer transition-all"
                      style={{ filter: hoveredSkill === skill.name ? "drop-shadow(0 0 10px currentColor)" : "none" }}
                    />
                    
                    {hoveredSkill === skill.name && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <rect
                          x={clampedCenterX - tooltipWidth / 2}
                          y={clampedTopY}
                          width={tooltipWidth}
                          height={tooltipHeight}
                          rx="6"
                          fill="hsl(var(--card))"
                          stroke={getCategoryColor(skill.category)}
                          strokeWidth="2"
                        />
                        <text
                          x={clampedCenterX}
                          y={clampedTopY + 13}
                          textAnchor="middle"
                          fill="hsl(var(--foreground))"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {skill.name}
                        </text>
                        <text
                          x={clampedCenterX}
                          y={clampedTopY + 25}
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          fontSize="10"
                        >
                          {infoText}
                        </text>
                      </motion.g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {Array.from(new Set(skills.map(s => s.category))).map((category) => (
              <div key={category} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCategoryColor(category) }}
                />
                <span className="text-sm text-muted-foreground">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechRadar;
