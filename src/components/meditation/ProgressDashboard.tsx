import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, CalendarDays, Trophy } from "lucide-react";
import StreakCounter from "./StreakCounter";
import MoodTrends from "./MoodTrends";
import Achievements from "./Achievements";

interface ProgressDashboardProps {
  streakData?: {
    currentStreak: number;
    longestStreak: number;
    daysThisWeek: number;
    totalDays: number;
  };
  moodData?: {
    date: string;
    mood: string;
    intensity: number;
  }[];
  achievements?: {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    progress: number;
    isUnlocked: boolean;
  }[];
  selectedTimeRange?: "week" | "month" | "year";
  onTimeRangeChange?: (range: "week" | "month" | "year") => void;
  isLoading?: boolean;
}

const ProgressDashboard = ({
  streakData = {
    currentStreak: 3,
    longestStreak: 7,
    daysThisWeek: 4,
    totalDays: 15,
  },
  moodData = [
    { date: "2024-01-01", mood: "Calm", intensity: 4 },
    { date: "2024-01-02", mood: "Happy", intensity: 5 },
    { date: "2024-01-03", mood: "Stressed", intensity: 2 },
    { date: "2024-01-04", mood: "Peaceful", intensity: 4 },
    { date: "2024-01-05", mood: "Grateful", intensity: 5 },
  ],
  achievements = [],
  selectedTimeRange = "week",
  onTimeRangeChange = () => {},
  isLoading = false,
}: ProgressDashboardProps) => {
  return (
    <div className="w-[1000px] bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Meditation Progress
        </h2>
        <div className="flex gap-2">
          {["week", "month", "year"].map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() =>
                onTimeRangeChange(range as "week" | "month" | "year")
              }
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-8">
          <StreakCounter {...streakData} />
          <MoodTrends
            moodData={moodData}
            timeRange={selectedTimeRange}
            isLoading={isLoading}
          />
        </div>
        <Achievements achievements={achievements} />
      </div>
    </div>
  );
};

export default ProgressDashboard;
