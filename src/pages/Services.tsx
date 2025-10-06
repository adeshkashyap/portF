import { Card } from "@/components/ui/card";
import { Code, Database, Bot, ShoppingCart, Cloud, Zap } from "lucide-react";
import ServiceSpheres3D from "@/components/ui/ServiceSpheres3D";
import MascotGuide from "@/components/ui/MascotGuide";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Web & App Development",
      description: "Full-stack development of scalable web and mobile applications tailored to your business needs",
    },
    {
      icon: Database,
      title: "API Development & Integration",
      description: "Design and implementation of RESTful and GraphQL APIs with seamless third-party integrations",
    },
    {
      icon: Bot,
      title: "AI Chatbot & Automation",
      description: "Intelligent WhatsApp bots and workflow automation solutions powered by AI",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "Complete e-commerce solutions with payment gateways, inventory management, and analytics",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps Consulting",
      description: "Cloud infrastructure setup, containerization, and CI/CD pipeline implementation",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Database query optimization, caching strategies, and application performance tuning",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive development services to bring your ideas to life
          </p>
        </div>

        {/* 3D representation + mascot storytelling */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          <ServiceSpheres3D />
          <MascotGuide />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
