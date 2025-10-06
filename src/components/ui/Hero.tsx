import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Briefcase } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import ResumePDF from "@/assets/ADESH-KUMAR.pdf";

const Hero = () => {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <ParticleBackground />
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-2 bg-secondary rounded-full text-sm font-medium">
            Adesh Kumar — Full Stack Developer
          </div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight min-h-[1.2em]"
          >
            <span className="gradient-text">
              <Typewriter
                options={{
                  strings: ["I Build Scalable & Intelligent Software"],
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 20,
                  cursor: "|",
                }}
              />
            </span>
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Full Stack Development • APIs • AI Automation • Cloud Infrastructure
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="group glow-effect-lg"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="group hover:shadow-[var(--shadow-card)]"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Hire Me
            </Button>
            
            <Button size="lg" variant="ghost" asChild>
              <a href={ResumePDF} download="Adesh-Kumar-Resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">4+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">15+</div>
              <div className="text-sm text-muted-foreground mt-1">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
