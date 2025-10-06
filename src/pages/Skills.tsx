import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Code, Cpu, Database, Brain, ServerCog, Cloud } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend & APIs",
      skills: ["Node.js", "Express.js", "Laravel", "REST APIs", "GraphQL", "Microservices"],
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "Bootstrap", "Tailwind CSS", "WebSockets"],
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Databases",
      skills: ["MongoDB", "MySQL", "Redis", "Couchbase", "Pinecone", "Weaviate"],
      color: "bg-primary/10 text-primary",
    },
    {
      title: "DevOps & Cloud",
      skills: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD"],
      color: "bg-accent/10 text-accent",
    },
    {
      title: "AI & Automation",
      skills: ["WhatsApp Bots", "LiteLLM", "n8n", "LangChain", "OpenAI"],
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Collaboration Tools",
      skills: ["Jira", "Notion", "Slack", "Git", "Agile"],
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive technology stack covering the entire development lifecycle
          </p>
        </motion.div>

        {/* Radar chart visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card className="p-4" aria-label="Skills radar chart">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={[
                    { subject: "Backend", A: 95, desc: "Node.js, GraphQL, REST, Microservices" },
                    { subject: "Frontend", A: 90, desc: "React, Tailwind, Accessibility" },
                    { subject: "Database", A: 85, desc: "MongoDB, MySQL, Redis" },
                    { subject: "DevOps", A: 80, desc: "Docker, K8s, CI/CD" },
                    { subject: "AI", A: 75, desc: "Automation, Chatbots, LLM APIs" },
                    { subject: "Cloud", A: 80, desc: "AWS, scaling, observability" },
                  ]}
                >
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--border))" />
                  <RechartsTooltip formatter={(value: any, _name: any, obj: any) => [`${value}%`, obj.payload?.desc || ""]} />
                  <Radar isAnimationActive name="Skills" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1" tabIndex={0} aria-label={`Skill category ${category.title}`}>
                <div className="flex items-center gap-2 mb-4">
                  {category.title.includes("Backend") && <Code className="h-5 w-5 text-primary" />}
                  {category.title.includes("Frontend") && <Cpu className="h-5 w-5 text-accent" />}
                  {category.title.includes("Database") && <Database className="h-5 w-5 text-primary" />}
                  {category.title.includes("AI") && <Brain className="h-5 w-5 text-accent" />}
                  {category.title.includes("DevOps") && <ServerCog className="h-5 w-5 text-primary" />}
                  {category.title.includes("Cloud") && <Cloud className="h-5 w-5 text-accent" />}
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className={category.color}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
