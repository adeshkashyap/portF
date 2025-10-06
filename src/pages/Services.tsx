import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Code, Bot, Cloud, ShieldCheck } from "lucide-react";
import ChatPreview from "@/components/ui/ChatPreview";
import MascotGuide from "@/components/ui/MascotGuide";

const Services = () => {
  // Simple emoji-based logo map for recognizable tech identity without external assets
  const techIcon: Record<string, string> = {
    "Node.js": "🟢",
    Express: "🚏",
    FastAPI: "⚡",
    GraphQL: "🔺",
    REST: "🔗",
    Swagger: "📘",
    Postman: "🧪",
    "Apollo Server": "🛰️",
    gRPC: "🛰️",
    OpenAPI: "📄",
    "JSON Schema": "🧩",
    Python: "🐍",
    TensorFlow: "🧠",
    PyTorch: "🔥",
    "Scikit‑learn": "📈",
    HuggingFace: "🤗",
    "OpenAI GPT": "✨",
    spaCy: "🧬",
    Keras: "🧱",
    ONNX: "🔄",
    MLflow: "🧪",
    Docker: "🐳",
    Kubernetes: "☸️",
    Terraform: "🏗️",
    "GitHub Actions": "⚙️",
    Jenkins: "🧑‍🔧",
    AWS: "☁️",
    Azure: "🔷",
    Prometheus: "📊",
    Grafana: "📈",
    "ELK Stack": "🪵",
    Ansible: "🛠️",
  };
  const services: Array<{
    icon: any;
    title: string;
    description: string;
    features: string[];
    techTags: string[];
    examples: string[];
  }> = [
    {
      icon: Code,
      title: "API Development & Integration",
      description:
        "Robust REST/GraphQL APIs with authentication, rate‑limiting, and observability. We ship strongly‑typed contracts, excellent docs, and integration test coverage.",
      features: ["REST & GraphQL", "JWT/OAuth2", "Tracing & metrics", "Schema‑first docs"],
      techTags: [
        "Node.js",
        "Express",
        "FastAPI",
        "GraphQL",
        "REST",
        "Swagger",
        "Postman",
        "Apollo Server",
        "gRPC",
        "OpenAPI",
        "JSON Schema",
      ],
      examples: [
        "Unified API gateway for B2B platform (rate‑limited, 99.95% uptime)",
        "Auto‑generated OpenAPI docs and Postman collections",
      ],
    },
    {
      icon: Bot,
      title: "AI Chatbots & Automation",
      description:
        "Practical AI for business workflows: WhatsApp assistants, RAG search, and back‑office automations. Designed for reliability, safety, and low latency.",
      features: ["RAG pipelines", "n8n orchestration", "Prompt safety", "Latency budgets"],
      techTags: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit‑learn",
        "HuggingFace",
        "OpenAI GPT",
        "spaCy",
        "Keras",
        "ONNX",
        "MLflow",
      ],
      examples: [
        "WhatsApp AI assistant reducing reply time by 70%",
        "Document Q&A with RAG over knowledge base",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps Consulting",
      description:
        "Shipping with confidence via containers, CI/CD, and IaC. We add observability, cost controls, and scalable patterns tuned to your workloads.",
      features: ["Docker/Kubernetes", "GitHub Actions", "IaC & cost control", "SLOs & alerts"],
      techTags: [
        "Docker",
        "Kubernetes",
        "Terraform",
        "GitHub Actions",
        "Jenkins",
        "AWS",
        "Azure",
        "Prometheus",
        "Grafana",
        "ELK Stack",
        "Ansible",
      ],
      examples: [
        "Blue‑green deploys with zero‑downtime migrations",
        "Infra cost optimization (15–30% savings)",
      ],
    },
  ];

  return (
    <section id="services" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Outcome‑driven engineering across API, AI, and DevOps — production‑ready, secure, and observable
          </p>
        </div>

        {/* Visual intro (kept subtle to avoid clutter) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          <ChatPreview />
          <MascotGuide />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-6 border border-border/70 rounded-xl transition-all group focus-within:ring-2 focus-within:ring-primary/40 hover:shadow-2xl hover:-translate-y-1 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50"
                tabIndex={0}
                aria-label={`Service: ${service.title}`}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 bg-gradient-to-br from-primary/90 to-primary-glow shadow-sm">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>

                {/* Tech tags (no floating tooltip; inline, accessible) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.techTags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="px-2 py-1 text-[11px] rounded-md bg-secondary hover:bg-primary/10 hover:text-foreground transition-transform focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-0 focus:ring-offset-background hover:scale-[1.03]"
                      aria-label={`Technology: ${t}`}
                      tabIndex={0}
                    >
                      <span className="mr-1" aria-hidden>{techIcon[t] ?? ""}</span>{t}
                    </Badge>
                  ))}
                </div>

                {"features" in service && (
                  <ul className="text-sm space-y-1 mb-2">
                    {(service as any).features?.map((f: string) => (
                      <li key={f} className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Expandable details on hover/focus (no overflow) */}
                <div className="transition-all duration-300 ease-out max-h-0 opacity-0 overflow-hidden group-hover:max-h-48 group-hover:opacity-100 group-focus-within:max-h-48 group-focus-within:opacity-100">
                  <div className="mt-3 pt-3 border-t border-border/60">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Recent highlights</p>
                    <ul className="text-sm space-y-1">
                      {service.examples.map((ex) => (
                        <li key={ex} className="text-muted-foreground">{ex}</li>
                      ))}
                    </ul>
                    {/* Micro-testimonial linking to case studies */}
                    <p className="mt-3 text-sm italic text-muted-foreground">
                      "See how this translated to real results in our <a href="#case-studies" className="underline decoration-dotted underline-offset-4 hover:text-foreground">Case Studies</a>."
                    </p>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-3">Learn more</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{service.title}</DialogTitle>
                      <DialogDescription>{service.description}</DialogDescription>
                    </DialogHeader>
                    {"features" in service && (
                      <div className="mt-2 grid grid-cols-1 gap-2">
                        {(service as any).features?.map((f: string) => (
                          <Badge key={f} variant="secondary" className="justify-start w-full">
                            {f}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {/* Placeholder for future: logos, case studies links */}
                  </DialogContent>
                </Dialog>
                </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Services;
