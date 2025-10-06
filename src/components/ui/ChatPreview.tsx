import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, FileWarning, CalendarDays, Play, Pause } from "lucide-react";

// Lightweight, accessible animated chat preview
// - Cycles through a short conversation
// - Pause/Resume control
// - Typing indicator between bot messages
// - Responsive and keyboard accessible

export default function ChatPreview() {
  const conversation = useMemo(
    () => [
      { from: "user" as const, text: "What’s the status of my last deployment?" },
      { from: "bot" as const, text: "Deployment completed successfully 5 minutes ago.", icon: <Clock className="h-4 w-4" aria-hidden /> },
      { from: "user" as const, text: "Show me the error logs from yesterday." },
      { from: "bot" as const, text: "Here are the error logs with timestamps.", icon: <FileWarning className="h-4 w-4" aria-hidden /> },
      { from: "user" as const, text: "Schedule a weekly deployment report." },
      { from: "bot" as const, text: "Setup complete. You’ll receive reports every Monday morning.", icon: <CalendarDays className="h-4 w-4" aria-hidden /> },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    resetTimer();
    if (paused) return;

    const current = conversation[index % conversation.length];
    const isBot = current.from === "bot";

    if (isBot) {
      // show typing indicator briefly before rendering bot message
      setTyping(true);
      timerRef.current = window.setTimeout(() => {
        setTyping(false);
        timerRef.current = window.setTimeout(() => setIndex((i) => (i + 1) % conversation.length), 2200);
      }, 1000);
    } else {
      // user messages show, then advance
      timerRef.current = window.setTimeout(() => setIndex((i) => (i + 1) % conversation.length), 1800);
    }

    return () => resetTimer();
  }, [index, paused, conversation]);

  const onToggle = () => setPaused((p) => !p);

  // reset to start when reaching the end to keep context tidy
  useEffect(() => {
    if (index === conversation.length - 1 && !paused) {
      // give the last message time to display
      const t = window.setTimeout(() => setIndex(0), 2600);
      return () => window.clearTimeout(t);
    }
  }, [index, conversation.length, paused]);

  return (
    <section aria-label="AI Chat automation preview" className="w-full">
      <div
        className="relative mx-auto max-w-md rounded-2xl border border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50 shadow-lg overflow-hidden"
      >
        {/* Header with pause/resume */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 bg-muted/40">
          <p className="text-xs text-muted-foreground">AI Automation & Chatbot Workflow</p>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-border/60 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-pressed={paused}
            aria-label={paused ? "Resume conversation" : "Pause conversation"}
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
            {paused ? "Resume" : "Pause"}
          </button>
        </div>

        {/* Chat body */}
        <div className="p-4 space-y-2 min-h-[280px]">
          <AnimatePresence initial={false}>
            {conversation.slice(0, index + 1).map((msg, i) => (
              <motion.div
                key={`${i}-${msg.text}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                aria-live="polite"
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug shadow-sm ${
                    msg.from === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.from === "bot" && msg.icon ? <span className="mt-0.5 text-muted-foreground">{msg.icon}</span> : null}
                    <p>{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator for bot */}
          <AnimatePresence>
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-start"
                aria-live="polite"
              >
                <div className="inline-flex items-center gap-1.5 rounded-2xl bg-muted px-3 py-2 text-xs text-muted-foreground">
                  <span className="sr-only">Bot typing</span>
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:0.2s]"></span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-3 border-t border-border/60 bg-muted/40 text-xs text-muted-foreground">
          <p>
            Learn more about automation flows in our
            {" "}
            <a href="#case-studies" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
              Case Studies
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
