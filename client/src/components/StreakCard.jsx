import React from 'react';
import { Flame } from 'lucide-react';

const StreakCard = ({ streak }) => {
  let cardStyle = "from-slate-800 to-slate-700/50";
  let iconStyle = "text-slate-500";
  let shadowStyle = "";
  let textStyle = "text-slate-400";
  let message = "Log your first day to start a streak!";

  if (streak > 0) {
    cardStyle = "from-amber-600/20 to-slate-800";
    iconStyle = "text-amber-500";
    shadowStyle = "drop-shadow-[0_2px_3px_rgba(245,158,11,0.5)]";
    textStyle = "text-amber-400";
    message = "You're on a roll!";
  }
  if (streak >= 5) {
    cardStyle = "from-red-600/20 to-slate-800";
    iconStyle = "text-red-500 animate-pulse";
    shadowStyle = "drop-shadow-[0_2px_5px_rgba(239,68,68,0.6)]";
    textStyle = "text-red-400";
    message = "Incredible! Keep the fire burning!";
  }
   if (streak >= 15) {
    cardStyle = "from-orange-500/20 to-slate-800";
    iconStyle = "text-orange-400 animate-pulse";
    shadowStyle = "drop-shadow-[0_2px_8px_rgba(249,115,22,0.7)]";
    textStyle = "text-orange-300";
    message = "Unstoppable force!";
  }

  return (
    <div className={`card shadow-xl h-full bg-gradient-to-br transition-all duration-300 ${cardStyle}`}>
      <div className="card-body flex-col items-center justify-center text-center">
        <div className={`transition-all duration-300 ${shadowStyle}`}>
            <Flame size={72} className={`transition-all duration-300 ${iconStyle}`} />
        </div>
        <div className="mt-2">
            <p className="text-6xl font-bold text-white drop-shadow-lg">{streak}</p>
            <p className="text-lg font-semibold text-white/80 -mt-1">Day Streak</p>
        </div>
        <p className={`mt-2 font-semibold ${textStyle}`}>{message}</p>
      </div>
    </div>
  );
};

export default StreakCard;