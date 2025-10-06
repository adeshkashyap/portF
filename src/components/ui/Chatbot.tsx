import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type ChatMessage = { text: string; isBot: boolean; ts: string };

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hi! I'm your AI assistant. Ask about our skills, services, projects or how to contact us.", isBot: true, ts: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const faqs: Record<string, string> = {
    services: "We offer Custom Web & App Development, API Development & Integration, AI Bots & Automation, E-commerce Platforms, and Cloud & DevOps Consulting.",
    skills: "Our core skills include Node.js, React, Laravel, MongoDB, MySQL, Docker, Kubernetes, AWS, GraphQL, and AI/ML technologies.",
    projects: "We've built WhatsApp AI Assistants, B2B Medicine E-commerce Platforms, Real Estate Management Systems, and Coworking Booking Platforms.",
    contact: "You can reach us at akkashyap110094@gmail.com or call +91 8447888221. We're also available on WhatsApp, LinkedIn, and GitHub!",
    experience: "Adesh Kumar has 4+ years of experience in Full Stack Development, with expertise in fintech, AI automation, and enterprise solutions.",
    team: "We're a Full Stack Development Studio specializing in MERN, Laravel, APIs, Microservices, AI automation, and DevOps.",
  };

  const suggestions = [
    "What services do you offer?",
    "Show recent projects",
    "What skills do you specialize in?",
    "How can I contact you?",
  ];

  useEffect(() => {
    // Auto-scroll to latest message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, isOpen]);

  async function replyWithAI(userMessage: string) {
    // Try calling a backend AI endpoint if available; otherwise fallback to FAQ heuristics.
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        return String(data?.answer || "");
      }
    } catch (_) {
      // ignore and fallback
    }

    // Fallback: lightweight keyword-based FAQ answer
    let response = "I can help with services, skills, projects, experience, team and contact. What would you like to know?";
    const lowerInput = userMessage.toLowerCase();
    for (const [key, value] of Object.entries(faqs)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }
    if (/project|case|portfolio|work/.test(lowerInput)) response = faqs.projects;
    if (/skill|stack|tech/.test(lowerInput)) response = faqs.skills;
    if (/service|offer|build/.test(lowerInput)) response = faqs.services;
    if (/contact|email|phone|whatsapp|linkedin|github/.test(lowerInput)) response = faqs.contact;
    return response;
  }

  const handleSend = async (forced?: string) => {
    if (!input.trim() && !forced) return;
    const text = forced ?? input.trim();
    const ts = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { text, isBot: false, ts }]);
    setInput("");
    setTyping(true);

    const answer = await replyWithAI(text);
    setTyping(false);
    setMessages((prev) => [...prev, { text: answer, isBot: true, ts: new Date().toLocaleTimeString() }]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg glow-effect"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="glass-card overflow-hidden">
              {/* Header */}
              <div className="bg-primary p-4 text-primary-foreground">
                <h3 className="font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Assistant
                </h3>
                <p className="text-xs opacity-90">Ask about skills, services, projects or contact</p>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="h-[420px] overflow-y-auto p-4 space-y-3 bg-background/50">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${message.isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <div className={`mt-1 text-[10px] opacity-70 ${message.isBot ? "text-foreground" : "text-primary-foreground"}`}>
                        {message.ts}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground flex items-center gap-2">
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-pulse [animation-delay:300ms]" />
                      </span>
                      typing...
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-background">
                {/* Quick Replies */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {suggestions.map((s) => (
                    <Button key={s} size="sm" variant="outline" onClick={() => handleSend(s)}>
                      {s}
                    </Button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim().length < 2) return; // basic validation
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about our skills, services or projects..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
