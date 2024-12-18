import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, RefreshCw } from "lucide-react";

interface TimerControlsProps {
  isActive?: boolean;
  isPaused?: boolean;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onReset?: () => void;
}

const TimerControls = ({
  isActive = false,
  isPaused = false,
  onStart = () => {},
  onPause = () => {},
  onStop = () => {},
  onReset = () => {},
}: TimerControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-lg shadow-sm w-[300px]">
      {/* Start/Pause Button */}
      {!isActive || isPaused ? (
        <Button
          onClick={onStart}
          size="lg"
          className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
        >
          <Play className="h-8 w-8" />
        </Button>
      ) : (
        <Button
          onClick={onPause}
          size="lg"
          className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors duration-200"
        >
          <Pause className="h-8 w-8" />
        </Button>
      )}

      {/* Stop Button - Only shown when timer is active */}
      {isActive && (
        <Button
          onClick={onStop}
          size="lg"
          variant="destructive"
          className="w-12 h-12 rounded-full transition-all duration-200"
        >
          <Square className="h-6 w-6" />
        </Button>
      )}

      {/* Reset Button - Always visible */}
      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className="w-12 h-12 rounded-full transition-all duration-200"
      >
        <RefreshCw className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default TimerControls;
