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
    <div className="relative w-full max-w-[300px] sm:max-w-[400px] aspect-square flex items-center justify-center bg-white rounded-full shadow-lg">
      {/* Outer circle with progress */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Progress
          value={progress}
          className="h-full w-full rounded-full transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Inner circle with time display */}
      <div className="relative z-10 w-[95%] h-[95%] rounded-full bg-white flex flex-col items-center justify-center">
        <div
          className={cn(
            "text-4xl sm:text-6xl font-light transition-colors duration-300",
            isActive ? "text-blue-600" : "text-gray-700",
          )}
        >
          {timeRemaining}
        </div>
        <div className="text-base sm:text-lg text-gray-500 mt-2">
          {isActive ? "Meditating" : "Ready to begin"}
        </div>
      </div>

      {/* Pulsing animation when active */}
      {isActive && (
        <div className="absolute inset-0 rounded-full animate-pulse bg-blue-100 opacity-20" />
      )}
    </div>
  );
};

export default CircularTimer;
