import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
} from "recharts";

/*
  CaseStudies section
  - Presents projects as problem → solution → impact narratives
  - Uses Framer Motion for reveals and Recharts for quantitative visuals
  - Designed to be easily extendable: just push to the `studies` array
*/

const studies = [
  {
    title: "WhatsApp AI Assistant",
    problem:
      "Slow customer response and high manual workload across support channels.",
    solution:
      "Built AI-powered WhatsApp assistant with intent detection, CRM hooks, and automated workflows.",
    impact: [
      { label: "Response Time ↓", value: 70 },
      { label: "Leads ↑", value: 180 },
      { label: "CSAT ↑", value: 30 },
    ],
    chart: [
      { name: "Before", time: 120, leads: 100 },
      { name: "After", time: 36, leads: 280 },
    ],
    tech: ["Node.js", "OpenAI", "Redis", "Kafka", "Docker"],
  },
  {
    title: "B2B Medicine Platform",
    problem:
      "Inefficient bulk ordering with slow queries and inconsistent inventory sync.",
    solution:
      "Implemented GraphQL gateway, optimized indexes and caching, and automated reconciliation.",
    impact: [
      { label: "Query Time ↓", value: 40 },
      { label: "Throughput ↑", value: 220 },
      { label: "Errors ↓", value: 60 },
    ],
    chart: [
      { name: "Before", time: 1000, throughput: 1 },
      { name: "After", time: 600, throughput: 3.2 },
    ],
    tech: ["GraphQL", "MongoDB", "AWS", "Redis", "Node.js"],
  },
  {
    title: "Real Estate Management",
    problem:
      "Manual listing, poor SEO performance, and low team coordination.",
    solution:
      "Automated syndication, role-based workflows, and SEO tools with sitemaps and structured data.",
    impact: [
      { label: "Leads ↑", value: 300 },
      { label: "Ops Time ↓", value: 55 },
      { label: "SEO Score ↑", value: 35 },
    ],
    chart: [
      { name: "Before", leads: 100, ops: 100 },
      { name: "After", leads: 400, ops: 45 },
    ],
    tech: ["Laravel", "MySQL", "React", "AWS"],
  },
] as const;

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real business problems solved with measurable outcomes
          </p>
        </motion.div>

        <TooltipProvider>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {studies.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-6 glass-card h-full">
                  <h3 className="text-2xl font-bold mb-2">{s.title}</h3>

                  {/* Narrative */}
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-foreground">Problem: </span>
                      <span className="text-muted-foreground">{s.problem}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Solution: </span>
                      <span className="text-muted-foreground">{s.solution}</span>
                    </div>
                  </div>

                  {/* Tech Stack Badges with tooltips */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.tech.map((t) => (
                      <Tooltip key={t}>
                        <TooltipTrigger asChild>
                          <span className="inline-flex">
                            <Badge variant="secondary" className="cursor-default">
                              {t}
                            </Badge>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>

                  {/* Charts / Infographics */}
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    {/* Bar chart example (impact comparison) */}
                    <div className="h-40 bg-card/50 rounded-lg border border-border/60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[...s.chart]} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <RechartsTooltip cursor={{ fill: "hsl(var(--muted)/0.2)" }} />
                          {/* Choose keys dynamically if present */}
                          {"leads" in s.chart[0] && (
                            <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                          )}
                          {"throughput" in s.chart[0] && (
                            <Bar dataKey="throughput" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                          )}
                          {"ops" in s.chart[0] && (
                            <Bar dataKey="ops" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Line chart example (time reduction) */}
                    <div className="h-40 bg-card/50 rounded-lg border border-border/60">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[...s.chart]} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <RechartsTooltip cursor={{ stroke: "hsl(var(--muted-foreground))" }} />
                          {"time" in s.chart[0] && (
                            <Line type="monotone" dataKey="time" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Impact badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.impact.map((i) => (
                      <Badge key={i.label} className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                        {i.label} {i.value}%
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
