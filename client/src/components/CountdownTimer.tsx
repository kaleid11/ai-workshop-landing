import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  // Workshop date: Wednesday Nov 26, 2025, 9am Brisbane time (UTC+10)
  const workshopDate = new Date("2025-11-26T09:00:00+10:00");

  const calculateTimeLeft = (): TimeLeft => {
    const difference = workshopDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-center">
        <p className="font-semibold">Workshop has started!</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center">
      <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-center min-w-[70px]">
        <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-xs text-white/80 uppercase tracking-wide">Days</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-center min-w-[70px]">
        <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
        <div className="text-xs text-white/80 uppercase tracking-wide">Hours</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-center min-w-[70px]">
        <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-xs text-white/80 uppercase tracking-wide">Mins</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-center min-w-[70px]">
        <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-xs text-white/80 uppercase tracking-wide">Secs</div>
      </div>
    </div>
  );
}
