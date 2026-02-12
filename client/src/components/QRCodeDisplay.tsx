import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDisplayProps {
  value: string;
}

export function QRCodeDisplay({ value }: QRCodeDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (ref.current === null) return;

    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true, backgroundColor: '#ffffff', pixelRatio: 4 });
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Downloaded",
        description: "QR Code saved to your device.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Could not generate image.",
      });
    }
  };

  const handleShare = async () => {
     if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code',
          text: value,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
       toast({
        description: "Sharing not supported on this browser",
      });
    }
  }

  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div 
        className="p-8 bg-white rounded-3xl shadow-[0_0_50px_-12px_rgba(124,58,237,0.5)] border-4 border-primary/20 relative group transition-all hover:scale-105 duration-300"
      >
        <div ref={ref} className="bg-white p-4 rounded-xl">
            {/* The actual QR code needs to be on a white background for scanners to read reliably */}
            <QRCodeSVG
              value={value || "https://example.com"}
              size={256}
              level="H"
              includeMargin={false}
              className="w-full h-auto max-w-[250px] max-h-[250px]"
            />
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-xs">
        <Button 
          onClick={handleDownload}
          disabled={!value}
          className="flex-1 h-12 rounded-xl bg-white text-black hover:bg-gray-100 font-bold transition-all hover:-translate-y-1 shadow-lg hover:shadow-white/20"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button 
          onClick={handleShare}
          disabled={!value}
          variant="outline"
          className="h-12 w-12 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
