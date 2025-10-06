import { Briefcase, Award, Code, Rocket, GraduationCap, Building2 } from "lucide-react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

/*
  Timeline component
  - Data-driven vertical timeline listing roles, milestones, awards, certifications
  - Uses react-vertical-timeline-component for layout and Framer Motion for section reveal
  - To add a new milestone, push a new object into the `items` array below
*/

type TimelineItem = {
  date: string;
  title: string; // role or milestone title
  company?: string; // company or project
  description: string;
  icon: JSX.Element;
  badges?: Array<{ label: string; type?: "award" | "cert" | "milestone" }>;
};

const items: TimelineItem[] = [
  {
    date: "Jul 2025 – Present",
    title: "Full Stack Developer",
    company: "DIRO – Internet Original Documents, Inc.",
    description:
      "Optimized API infrastructure with dynamic config, secure credentials, pooling, and monitoring (SonarQube, Graylog, Sentry). Integrated LiteLLM & n8n for AI-driven automation.",
    icon: <Rocket className="h-6 w-6 text-primary" />,
    badges: [{ label: "AI Automation", type: "milestone" }],
  },
  {
    date: "Jun 2022 – Apr 2025",
    title: "Full Stack Developer",
    company: "Shared Tech Global — Noida",
    description:
      "Engineered RESTful APIs, optimized MongoDB queries, integrated WhatsApp into CRM with intelligent auto-replies, and designed secure JWT auth flows.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    badges: [{ label: "Performance", type: "milestone" }],
  },
  {
    date: "Mar 2021 – May 2022",
    title: "Junior Full Stack Developer",
    company: "Shree SS Coworking Pvt. Ltd — Ghaziabad",
    description:
      "Developed CRM for leads and sales tracking; built real estate platform with role-based dashboards; coworking booking with KYC, payments, and reservations.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    badges: [{ label: "Product Delivery", type: "milestone" }],
  },
  {
    date: "Dec 2022",
    title: "Bachelor of Computer Applications (BCA)",
    company: "IGNOU",
    description:
      "Core: DSA, OS, OOP (C++), DBMS. Applied: Web Dev, Software Eng, REST APIs, Node.js, Express.js, MongoDB, Git/GitHub.",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
    badges: [{ label: "Education", type: "cert" }],
  },
  {
    date: "Certifications",
    title: "NIELIT O Level, Meta Back-End, Docker & Kubernetes, Version Control, LangChain",
    company: "Coursera, Udemy, NIELIT",
    description:
      "Practical foundations in back-end development, containers/orchestration, version control best practices, and LLM application development.",
    icon: <Award className="h-6 w-6 text-primary" />,
    badges: [{ label: "Certificates", type: "cert" }],
  },
];

const badgeClass = (type?: string) =>
  type === "award"
    ? "bg-amber-500/20 text-amber-400"
    : type === "cert"
    ? "bg-emerald-500/20 text-emerald-400"
    : "bg-primary/15 text-primary";

const Timeline = () => {
  return (
    <section id="timeline" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Career <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground">Roles, milestones, certifications and awards</p>
        </motion.div>

        <VerticalTimeline>
          {items.map((m, i) => (
            <VerticalTimelineElement
              key={`${m.date}-${i}`}
              date={m.date}
              icon={m.icon}
              contentStyle={{ background: "hsl(var(--card) / 0.6)", backdropFilter: "blur(12px)", border: "1px solid hsl(var(--border) / 0.5)" }}
              contentArrowStyle={{ borderRight: "7px solid hsl(var(--border))" }}
              aria-label={`${m.title} at ${m.company ?? "Independent"}, ${m.date}`}
              tabIndex={0}
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Building2 className="h-4 w-4" />
                <span className="text-xs">{m.company ?? "Independent"}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{m.title}</h3>
              <p className="text-muted-foreground">{m.description}</p>

              {m.badges && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.badges.map((b, idx) => (
                    <span key={idx} className={`text-[11px] px-2 py-1 rounded-full border border-border/60 ${badgeClass(b.type)}`}>
                      {b.label}
                    </span>
                  ))}
                </div>
              )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
