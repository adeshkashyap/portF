import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold gradient-text mb-2">Adesh Kumar</div>
            <p className="text-sm text-muted-foreground">Full Stack Developer</p>
          </div>

          <div className="flex gap-4">
            <a
              href="mailto:akkashyap110094@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/adesh-kumar-one999/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/adeshkashyap"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {currentYear} Adesh Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
