import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

/**
 * WhatsApp floating button in bottom-left corner
 * Links to Tech Horizon Labs WhatsApp contact
 */
export default function WhatsAppButton() {
  const WHATSAPP_URL = "https://wa.me/message/WKT2DLIU5ACIO1";

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="lg"
              className="shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold p-4 rounded-full group"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Button>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-900 text-white">
          <p>Chat with us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
      
      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </div>
  );
}
