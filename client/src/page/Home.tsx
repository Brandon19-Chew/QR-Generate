import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useCreateQrCode } from "@/hooks/use-qr-codes";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { HistoryList } from "@/components/HistoryList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Zap, History, Sparkles } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState("");
  const [debouncedContent] = useDebounce(content, 1000);
  const createMutation = useCreateQrCode();

  // Auto-save history when debounced content changes and is not empty
  useEffect(() => {
    if (debouncedContent && debouncedContent.trim().length > 0) {
      createMutation.mutate({ content: debouncedContent });
    }
  }, [debouncedContent]);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat">
      <div className="min-h-screen bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 lg:py-24 max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-in slide-in-from-top-10 fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">QR Code Generator</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 tracking-tight glow-text">
              Share Instantly
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Create beautiful QR codes for your links, text, or contacts in seconds. 
              Automatically saved to your history.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Input & History */}
            <div className="space-y-8 animate-in slide-in-from-left-10 fade-in duration-700 delay-100">
              <div className="glass-panel rounded-3xl p-8">
                <Tabs defaultValue="generate" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-1 rounded-xl mb-8">
                    <TabsTrigger 
                      value="generate" 
                      className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-medium transition-all"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Generate
                    </TabsTrigger>
                    <TabsTrigger 
                      value="history"
                      className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-medium transition-all"
                    >
                      <History className="w-4 h-4 mr-2" />
                      History
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="generate" className="space-y-6 focus-visible:outline-none">
                    <div className="space-y-4">
                      <Label htmlFor="content" className="text-lg font-medium text-white/80 pl-1">
                        What would you like to share?
                      </Label>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-focus-within:opacity-75 transition duration-500" />
                        <Input
                          id="content"
                          placeholder="https://example.com or plain text"
                          className="relative h-16 px-6 rounded-xl bg-secondary/80 border-white/10 text-lg placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-white/30 transition-all"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground pl-1">
                        Start typing to see your QR code update instantly.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="focus-visible:outline-none">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white/80 pl-1">Recent Codes</h3>
                      <HistoryList onSelect={setContent} />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Decorative elements */}
              <div className="hidden lg:grid grid-cols-2 gap-4 opacity-50">
                <div className="p-6 rounded-2xl bg-secondary/20 border border-white/5">
                  <QrCode className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-white font-semibold mb-2">High Quality</h4>
                  <p className="text-sm text-muted-foreground">Vector-sharp resolution perfect for print or digital.</p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/20 border border-white/5">
                  <Zap className="w-8 h-8 text-accent mb-4" />
                  <h4 className="text-white font-semibold mb-2">Instant</h4>
                  <p className="text-sm text-muted-foreground">Real-time generation as you type. No waiting.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Display */}
            <div className="lg:sticky lg:top-24 flex flex-col items-center justify-center animate-in slide-in-from-right-10 fade-in duration-700 delay-200">
               <div className="relative">
                 {/* Background Glow Effect */}
                 <div className="absolute -inset-20 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                 
                 <QRCodeDisplay value={content || "https://example.com"} />
               </div>

               <div className="mt-12 text-center space-y-2">
                 <p className="text-sm font-medium text-white/50 uppercase tracking-widest">Preview</p>
                 <p className="text-white font-display text-xl max-w-xs truncate">
                   {content || "Your Content Here"}
                 </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
