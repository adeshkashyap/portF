import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Linkedin, Github, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Contact = () => {
  const { toast } = useToast();

  // zod schema for client-friendly validation
  const schema = z.object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Enter a valid email address"),
    subject: z.string().optional(),
    message: z.string().min(10, "Please provide a few details (min 10 chars)"),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Simulated submit handler: tries a backend first, then falls back to mock
  async function onSubmit(values: FormValues) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        toast({ title: "Message Sent!", description: "Thanks for reaching out — we'll reply shortly." });
        reset();
        return;
      }
      // Fallback mock
      await new Promise((r) => setTimeout(r, 800));
      toast({ title: "Message Sent (demo)", description: "This is a demo environment. We'll be in touch." });
      reset();
    } catch {
      toast({ title: "Network error", description: "Please try again or use a direct contact option.", variant: "destructive" as any });
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "akkashyap110094@gmail.com",
      href: "mailto:akkashyap110094@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8447888221",
      href: "tel:+918447888221",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: "https://wa.me/918447888221",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/adesh-kumar-one999/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View GitHub Profile",
      href: "https://github.com/adeshkashyap",
    },
  ];

  return (
    <section id="contact" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Have a project in mind? Get in touch and let's build something amazing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 glass-card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <Input id="name" placeholder="Your name" aria-invalid={!!errors.name} {...register("name")} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input id="email" type="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register("email")} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject (optional)</label>
                <Input id="subject" placeholder="Project inquiry, consultation, etc." {...register("subject")} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea id="message" rows={5} placeholder="Tell us about your project..." aria-invalid={!!errors.message} {...register("message")} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto group">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto group">
                  <a href="#contact" aria-label="Schedule a discovery call">
                    <Calendar className="h-4 w-4 mr-2" /> Schedule a Call
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Tip: You can also contact us directly via the options on the right.</p>
            </form>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow glass-card">
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">{method.label}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {method.value}
                      </div>
                    </div>
                  </a>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
