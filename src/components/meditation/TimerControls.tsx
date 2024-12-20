import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, RefreshCw, Clock, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface TimerControlsProps {
  isActive?: boolean;
  isPaused?: boolean;
  onStart?: (duration?: number) => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onReset?: () => void;
  selectedDuration?: number;
}

const DURATION_PRESETS = [
  { label: "5 minutes", value: 300 },
  { label: "10 minutes", value: 600 },
  { label: "20 minutes", value: 1200 },
  { label: "40 minutes", value: 2400 },
  { label: "60 minutes", value: 3600 },
];

const TimerControls = ({
  isActive = false,
  isPaused = false,
  onStart = () => {},
  onPause = () => {},
  onResume = () => {},
  onStop = () => {},
  onReset = () => {},
  selectedDuration = 1200,
}: TimerControlsProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  };

  const selectedPreset =
    DURATION_PRESETS.find((preset) => preset.value === selectedDuration) ||
    DURATION_PRESETS[2];

  return (
      <div className="flex flex-col items-center gap-6 p-4 bg-white rounded-lg shadow-sm w-full max-w-[300px] sm:max-w-[400px]">
        {!isActive && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="relative">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Clock className="h-4 w-4 mr-1" />
                {formatDuration(selectedPreset.value)} <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[200px]">
              {DURATION_PRESETS.map((preset) => (
                <DropdownMenuItem
                  key={preset.value}
                  onClick={() => onStart(preset.value)}
                  className="cursor-pointer"
                >
                  {preset.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            {/* Start/Pause Button */}
              {!isActive || isPaused ? (
                <Button
                  onClick={() =>
                    !isActive ? onStart(selectedDuration) : onResume()
                  }
                  size="lg"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                >
                  <Play className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              ) : (
                <Button
                  onClick={onPause}
                  size="lg"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors duration-200"
                >
                  <Pause className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              )}

          {/* Stop Button - Only shown when timer is active */}
          {isActive && (
                <Button
                  onClick={onStop}
                  size="lg"
                  variant="destructive"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200"
                >
                  <Square className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
          )}

          {/* Reset Button - Always visible */}
              <Button
                onClick={onReset}
                size="lg"
                variant="outline"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200"
              >
                <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-8 text-sm font-semibold">
            <span className="w-16 text-center text-blue-600">{!isActive ? "Start" : isPaused ? "Resume" : "Pause"}</span>
            {isActive && <span className="w-12 text-center text-red-600">Stop</span>}
            <span className="w-12 text-center text-gray-600">Reset</span>
          </div>
        </div>
      </div>
  );
};

export default TimerControls;
