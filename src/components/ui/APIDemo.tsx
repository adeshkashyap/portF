import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, Code, Play, Terminal } from "lucide-react";
import { useState } from "react";

// Schema for the API playground form
const schema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE"]).default("GET"),
  url: z.string().url("Enter a valid URL (https://...)"),
  body: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const presets = [
  { label: "GET Users", method: "GET", url: "https://jsonplaceholder.typicode.com/users" },
  { label: "GET Posts", method: "GET", url: "https://jsonplaceholder.typicode.com/posts" },
  { label: "POST Post", method: "POST", url: "https://jsonplaceholder.typicode.com/posts", body: '{"title":"hello","body":"world","userId":1}' },
  // Relative example to show mock handling
  { label: "GET /api/products (mock)", method: "GET", url: "/api/products" },
] as const;

function buildCurl({ method, url, body }: { method: string; url: string; body?: string }) {
  const parts: string[] = [];
  parts.push(`curl -X ${method} \\`);
  parts.push(`  '${url}' \\`);
  parts.push(`  -H 'Content-Type: application/json'`);
  if (body && body.trim()) {
    const safe = body.replace(/'/g, "'\\''");
    parts.push(`  -d '${safe}'`);
  }
  return parts.join("\n");
}

const APIDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [respTime, setRespTime] = useState<number | null>(null);
  const [response, setResponse] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { method: "GET", url: "https://jsonplaceholder.typicode.com/users", body: "" },
  });

  const method = watch("method");
  const url = watch("url");
  const body = watch("body");

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResponse(null);
    setStatus(null);
    setRespTime(null);
    const started = performance.now();

    // Simple mock for relative demo endpoints
    if (values.url.startsWith("/api/")) {
      await new Promise((r) => setTimeout(r, 900));
      const mock = {
        success: true,
        endpoint: values.url,
        method: values.method,
        timestamp: new Date().toISOString(),
        data: [{ id: 1, name: "Demo Product" }, { id: 2, name: "Another Product" }],
      };
      setResponse(mock);
      setStatus(200);
      setRespTime(Math.round(performance.now() - started));
      setIsLoading(false);
      toast.success("Mock API responded");
      return;
    }

    try {
      const res = await fetch(values.url, {
        method: values.method,
        headers: { "Content-Type": "application/json" },
        body: ["POST", "PUT"].includes(values.method) && values.body ? values.body : undefined,
      });
      const contentType = res.headers.get("content-type") || "";
      const jsonLike = contentType.includes("application/json");
      const data = jsonLike ? await res.json() : await res.text();
      setResponse({ ok: res.ok, status: res.status, data });
      setStatus(res.status);
      toast[res.ok ? "success" : "error"](res.ok ? "Request successful" : "Request failed");
    } catch (err: any) {
      setResponse({ error: String(err?.message || err) });
      setStatus(null);
      toast.error("Network error");
    } finally {
      setRespTime(Math.round(performance.now() - started));
      setIsLoading(false);
    }
  }

  return (
    <section id="api-demo" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Live API <span className="gradient-text">Playground</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Run real requests or mock endpoints. Explore how we design clean, robust APIs.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Request Builder */}
            <Card className="p-6 glass-card">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Request Builder</h3>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-2 mb-4">
                {presets.map((p) => (
                  <Button
                    key={p.label}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setValue("method", p.method as FormValues["method"]);
                      setValue("url", p.url);
                      setValue("body", (p as any).body || "");
                    }}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <Select value={method} onValueChange={(v) => setValue("method", v as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="https://api.example.com/resource" {...register("url")} />
                    {errors.url && <p className="text-xs text-destructive mt-1">{errors.url.message}</p>}
                  </div>
                </div>

                <Tabs defaultValue="body" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="body">Body</TabsTrigger>
                    <TabsTrigger value="snippet">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="body" className="mt-3">
                    <Textarea rows={6} placeholder='{"title":"hello"}' {...register("body")} disabled={method === "GET" || method === "DELETE"} />
                    <p className="text-xs text-muted-foreground mt-1">Only used for POST/PUT</p>
                  </TabsContent>
                  <TabsContent value="snippet" className="mt-3">
                    <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs overflow-auto">
                      <pre>{buildCurl({ method, url, body })}</pre>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <Button type="submit" disabled={isLoading} className="group">
                    <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Send Request
                  </Button>
                  {status !== null && (
                    <div className="text-sm text-muted-foreground">
                      <span className="mr-3">Status: <span className="font-semibold">{status}</span></span>
                      {respTime !== null && <span>Time: <span className="font-semibold">{respTime}ms</span></span>}
                    </div>
                  )}
                </div>
              </form>
            </Card>

            {/* Right: Response Viewer */}
            <Card className="p-6 glass-card">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-bold">Response</h3>
              </div>

              {isLoading && (
                <div className="space-y-3">
                  <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                  <div className="animate-pulse h-4 bg-muted rounded w-1/2" />
                  <div className="animate-pulse h-4 bg-muted rounded w-5/6" />
                </div>
              )}

              {!isLoading && !response && (
                <div className="h-full min-h-40 flex items-center justify-center text-muted-foreground">
                  Build a request and click Send
                </div>
              )}

              {!isLoading && response && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-auto">
                    <pre className="text-foreground">{typeof response === "string" ? response : JSON.stringify(response, null, 2)}</pre>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <Check className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                </motion.div>
              )}
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Tip: Use the presets to try real endpoints quickly, or switch to your own URL. Relative <code>/api/*</code> endpoints are mocked.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default APIDemo;
