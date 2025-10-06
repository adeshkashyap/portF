import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Tilt from "react-parallax-tilt";
import whatsappAI from "@/assets/whatsapp-ai.png";
import ecom from "@/assets/ecom.jpg";
import realEstate from "@/assets/real-estate.png";
import coworking from "@/assets/coworking.jpeg";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "WhatsApp AI Assistant",
      description: "AI-powered WhatsApp chatbot serving multiple businesses in real estate, legal, accounting, and astrology sectors with intelligent automation.",
      impact: "Adopted by 10+ businesses",
      improvement: "70% faster response time",
      tech: ["Node.js", "OpenAI", "Redis", "Kafka", "Docker", "Kubernetes"],
      image: whatsappAI,
    },
    {
      title: "B2B Medicine E-commerce Platform",
      description: "Enterprise-grade pharmaceutical marketplace with bulk ordering, KYC verification, and advanced inventory management system.",
      impact: "₹10M+ monthly transactions",
      improvement: "40% faster queries",
      tech: ["Node.js", "GraphQL", "MongoDB", "AWS", "Redis"],
      image: ecom,
    },
    {
      title: "Real Estate Management System",
      description: "Comprehensive property management platform with role-based dashboards, SEO tools, and automated property listing syndication.",
      impact: "1000+ properties managed",
      improvement: "3x lead generation",
      tech: ["Laravel", "PHP", "MySQL", "Vue.js", "AWS"],
      image: realEstate,
    },
    {
      title: "Coworking Booking Platform",
      description: "Smart coworking space management with online payments, automated rent tracking, invoice generation, and space utilization analytics.",
      impact: "500+ monthly bookings",
      improvement: "90% booking automation",
      tech: ["PHP", "MySQL", "Ola Maps", "ICICI Gateway", "Bootstrap"],
      image: coworking,
    },
  ];

  return (
    <section id="projects" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real-world solutions that drive measurable business impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Tilt glareEnable={true} glareColor="#a855f7" glareMaxOpacity={0.2} scale={1.02} className="w-full">
                <Card className="p-0 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="h-48 w-full overflow-hidden">
                    <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
              
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold">{project.impact}</div>
                          <div className="text-xs text-muted-foreground">Impact</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold">{project.improvement}</div>
                          <div className="text-xs text-muted-foreground">Improvement</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
