import { motion } from "framer-motion";

export default function MascotGuide() {
  return (
    <div className="glass-card rounded-xl p-6 h-full flex items-center gap-4">
      <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-effect">
        {/* Simple mascot face using SVG */}
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" className="text-primary-foreground/80" strokeWidth="1.5" />
          <circle cx="9" cy="10" r="1.2" fill="currentColor" className="text-primary-foreground" />
          <circle cx="15" cy="10" r="1.2" fill="currentColor" className="text-primary-foreground" />
          <path d="M8 15c1.2 1 2.4 1.5 4 1.5s2.8-.5 4-1.5" stroke="currentColor" className="text-primary-foreground" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="space-y-2">
        <motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm text-muted-foreground">
          Hi! I’m your guide. Explore how we design APIs, automate workflows with AI, and ship reliably with DevOps.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-secondary">Case Studies</span>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary">Automation Demos</span>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary">Deployment Playbooks</span>
        </motion.div>
      </div>
    </div>
  );
}
