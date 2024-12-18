import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StreakCounterProps {
  currentStreak?: number;
  longestStreak?: number;
  daysThisWeek?: number;
  totalDays?: number;
}

const StreakCounter = ({
  currentStreak = 3,
  longestStreak = 7,
  daysThisWeek = 4,
  totalDays = 15,
}: StreakCounterProps) => {
  return (
    <div className="w-[200px] bg-white rounded-lg shadow-sm">
      <Card className="p-4">
        <div className="space-y-4">
          {/* Current Streak */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-orange-500">🔥</div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {currentStreak} Days
              </div>
              <div className="text-xs text-gray-500">Current Streak</div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <div className="w-4 h-4">📅</div>
                <span>This Week</span>
              </div>
              <div className="text-sm font-medium">{daysThisWeek}/7</div>
            </div>
            <Progress value={(daysThisWeek / 7) * 100} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">
                {longestStreak}
              </div>
              <div className="text-xs text-gray-500">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">
                {totalDays}
              </div>
              <div className="text-xs text-gray-500">Total Days</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StreakCounter;
