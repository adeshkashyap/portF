import { Award, Code, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Adesh Kumar</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Full Stack Developer with 4+ years of experience in MERN and Laravel. Skilled in building APIs (REST, GraphQL),
            microservices, and deploying apps with Docker, Kubernetes, and AWS. Proficient with MongoDB, MySQL, Redis, and
            vector databases for AI use cases. Delivered fintech, AI automation, and B2B platforms with proven performance gains.
            Focused on clean code and efficient teamwork.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Full Stack Expertise</h3>
            <p className="text-muted-foreground">
              From backend architecture to frontend design, we handle the complete development lifecycle
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Solutions</h3>
            <p className="text-muted-foreground">
              Building intelligent automation systems and AI chatbots that drive business growth
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Award-Winning Team</h3>
            <p className="text-muted-foreground">
              Recognized for excellence in fintech, AI, and B2B platform development
            </p>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-card">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Adesh Kumar</h3>
                <p className="text-muted-foreground mb-4">
                  Full Stack Developer | MERN | Laravel | REST & GraphQL APIs | Microservices | DevOps | Databases
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Best Employee Award</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <span>Expertise in Fintech, AI & B2B Platforms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Specialized in Performance Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
