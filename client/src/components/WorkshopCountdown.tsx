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
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Clock className="w-4 h-4" />
        <span className="font-semibold">Loading...</span>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;
  const hasTimeLeft = days > 0 || hours > 0 || minutes > 0 || seconds > 0;

  if (!hasTimeLeft) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Clock className="w-4 h-4" />
        <span className="font-semibold">Workshop has started!</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Clock className="w-5 h-5 flex-shrink-0" />
      <div className="flex items-center gap-2">
        {days > 0 && (
          <>
            <div className="flex flex-col items-center min-w-[3rem]">
              <span className="text-2xl font-bold tabular-nums">{days}</span>
              <span className="text-xs opacity-75">day{days !== 1 ? 's' : ''}</span>
            </div>
            <span className="text-xl font-bold">:</span>
          </>
        )}
        <div className="flex flex-col items-center min-w-[3rem]">
          <span className="text-2xl font-bold tabular-nums">{hours.toString().padStart(2, '0')}</span>
          <span className="text-xs opacity-75">hours</span>
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="flex flex-col items-center min-w-[3rem]">
          <span className="text-2xl font-bold tabular-nums">{minutes.toString().padStart(2, '0')}</span>
          <span className="text-xs opacity-75">mins</span>
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="flex flex-col items-center min-w-[3rem]">
          <span className="text-2xl font-bold tabular-nums">{seconds.toString().padStart(2, '0')}</span>
          <span className="text-xs opacity-75">secs</span>
        </div>
      </div>
    </div>
  );
}
