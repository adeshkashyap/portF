import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Database, Bot, ShoppingCart, Cloud, PhoneCall, Calendar } from "lucide-react";

/*
  HireUs section
  - Persuasive services overview with clear CTAs
  - Accessible, responsive glassmorphism cards consistent with site theme
  - CTAs link to the Contact section (#contact) or a scheduling URL placeholder
*/

const services = [
  {
    icon: Code,
    title: "Custom Web & App Development",
    desc: "Design and build scalable, secure applications tailored to your goals—fast time to value and maintainable codebases.",
  },
  {
    icon: Database,
    title: "API Development & Integration",
    desc: "Robust REST/GraphQL APIs with auth, rate limits, and third‑party integrations that your teams love to use.",
  },
  {
    icon: Bot,
    title: "AI Bots & Automation Solutions",
    desc: "Automate workflows and support with AI assistants—reduce response times and operational overhead dramatically.",
  },
  {
    icon: ShoppingCart,
    title: "E‑commerce Platforms",
    desc: "Conversion‑focused storefronts with payments, inventory, and analytics—built for reliability and growth.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Consulting",
    desc: "Ship confidently with containerization, CI/CD, monitoring, and cost‑efficient cloud architecture.",
  },
] as const;

export default function HireUs() {
  return (
    <section id="hire-us" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Hire <span className="gradient-text">Me</span></h2>
          <p className="text-lg text-muted-foreground">
            I build products that solve real problems—combining engineering rigor with rapid execution.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-6 h-full glass-card hover:shadow-xl transition-all focus-within:ring-2 focus-within:ring-primary" tabIndex={0} aria-label={`Service ${s.title}`}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 glow-effect">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <div className="flex gap-2">
                    <Button asChild className="group">
                      <a href="#contact" aria-label={`Get a quote for ${s.title}`}>
                        Get a Quote
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="group" aria-label={`Schedule a call about ${s.title}`}>
                      <a href="#contact">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule a Call
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-4xl mx-auto text-center text-sm text-muted-foreground"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm">
            <PhoneCall className="h-4 w-4 text-accent" />
            <span>
              Trusted by startups and SMEs. Average response time <span className="font-semibold">&lt; 24h</span>.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
