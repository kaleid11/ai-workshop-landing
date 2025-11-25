import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface WorkshopCountdownProps {
  targetDate: Date;
  className?: string;
}

export function WorkshopCountdown({ targetDate, className = "" }: WorkshopCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  function calculateTimeLeft(): TimeLeft {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Prevent hydration mismatch by not rendering time until mounted
  if (!mounted) {
    return (
      <div className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-8 py-6 shadow-2xl ${className}`}>
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-white animate-pulse" />
          <span className="text-white font-semibold text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;
  const hasTimeLeft = days > 0 || hours > 0 || minutes > 0 || seconds > 0;

  if (!hasTimeLeft) {
    return (
      <div className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-8 py-6 shadow-2xl ${className}`}>
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-white animate-pulse" />
          <span className="text-white font-semibold text-lg">Workshop has started!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-8 py-6 shadow-2xl ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-white/90" />
          <span className="text-white/90 font-medium text-sm tracking-wide">Next Session Starts In:</span>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          {days > 0 && (
            <>
              <div className="flex flex-col items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[4.5rem] border border-white/30">
                  <span className="text-4xl md:text-5xl font-bold text-white tabular-nums drop-shadow-lg">{days}</span>
                </div>
                <span className="text-xs text-white/80 mt-2 font-medium uppercase tracking-wider">day{days !== 1 ? 's' : ''}</span>
              </div>
              <span className="text-3xl font-bold text-white/60 mb-6">:</span>
            </>
          )}
          
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[4.5rem] border border-white/30">
              <span className="text-4xl md:text-5xl font-bold text-white tabular-nums drop-shadow-lg">{hours.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs text-white/80 mt-2 font-medium uppercase tracking-wider">hours</span>
          </div>
          
          <span className="text-3xl font-bold text-white/60 mb-6">:</span>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[4.5rem] border border-white/30">
              <span className="text-4xl md:text-5xl font-bold text-white tabular-nums drop-shadow-lg">{minutes.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs text-white/80 mt-2 font-medium uppercase tracking-wider">mins</span>
          </div>
          
          <span className="text-3xl font-bold text-white/60 mb-6">:</span>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[4.5rem] border border-white/30 animate-pulse">
              <span className="text-4xl md:text-5xl font-bold text-white tabular-nums drop-shadow-lg">{seconds.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs text-white/80 mt-2 font-medium uppercase tracking-wider">secs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
