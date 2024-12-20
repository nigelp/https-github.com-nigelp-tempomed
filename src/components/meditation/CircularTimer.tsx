import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CircularTimerProps {
  progress?: number; // 0-100
  timeRemaining?: string;
  isActive?: boolean;
}

const CircularTimer = ({
  progress = 0,
  timeRemaining = "20:00",
  isActive = false,
}: CircularTimerProps) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
    <div className="relative w-[85vw] max-w-[320px] sm:w-full sm:max-w-[400px] aspect-square flex items-center justify-center bg-white rounded-full shadow-lg">
      {/* Outer circle with progress */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Progress 
          value={progress}
          className="h-full w-full rounded-full transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Inner circle with time display */}
      <div className="relative z-10 w-[92%] h-[92%] rounded-full bg-white flex flex-col items-center justify-center">
        <div
          className={cn(
            "text-[min(15vw,4.5rem)] sm:text-[min(12vw,5rem)] font-light transition-colors duration-300",
            isActive ? "text-blue-600" : "text-gray-700",
          )}
        >
          {timeRemaining}
        </div>
        <div className="text-[min(5vw,1.25rem)] sm:text-[min(4vw,1.5rem)] text-gray-500 mt-1 sm:mt-2">
          {isActive ? "Meditating" : "Ready to begin"}
        </div>
      </div>

      {/* Pulsing animation when active */}
      {isActive && (
        <div className="absolute inset-0 rounded-full animate-pulse bg-blue-100 opacity-20" />
      )}
    </div>
    </div>
  );
};

export default CircularTimer;
