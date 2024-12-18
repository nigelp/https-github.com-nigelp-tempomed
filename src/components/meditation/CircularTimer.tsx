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
    <div className="relative w-[400px] h-[400px] flex items-center justify-center bg-white rounded-full shadow-lg">
      {/* Outer circle with progress */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Progress
          value={progress}
          className="h-full w-full rounded-full transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Inner circle with time display */}
      <div className="relative z-10 w-[380px] h-[380px] rounded-full bg-white flex flex-col items-center justify-center">
        <div
          className={cn(
            "text-6xl font-light transition-colors duration-300",
            isActive ? "text-blue-600" : "text-gray-700",
          )}
        >
          {timeRemaining}
        </div>
        <div className="text-lg text-gray-500 mt-2">
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
