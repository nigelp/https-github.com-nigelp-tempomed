import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

interface MoodTrendsProps {
  moodData?: {
    date: string;
    mood: string;
    intensity: number;
  }[];
  timeRange?: "week" | "month" | "year";
  isLoading?: boolean;
}

const MoodTrends = ({
  moodData = [
    { date: "2024-01-01", mood: "Calm", intensity: 4 },
    { date: "2024-01-02", mood: "Happy", intensity: 5 },
    { date: "2024-01-03", mood: "Stressed", intensity: 2 },
    { date: "2024-01-04", mood: "Peaceful", intensity: 4 },
    { date: "2024-01-05", mood: "Grateful", intensity: 5 },
  ],
  timeRange = "week",
  isLoading = false,
}: MoodTrendsProps) => {
  // Calculate mood distribution
  const moodCounts = moodData.reduce(
    (acc, { mood }) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Find dominant mood
  const dominantMood = Object.entries(moodCounts).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ["", 0],
  )[0];

  // Calculate average intensity
  const avgIntensity =
    moodData.reduce((sum, { intensity }) => sum + intensity, 0) /
    moodData.length;

  return (
    <div className="w-[400px] bg-white rounded-lg shadow-sm">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium">Mood Trends</h3>
          </div>
          <div className="text-sm text-gray-500 capitalize">{timeRange}</div>
        </div>

        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading trends...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mood Chart Visualization */}
            <div className="h-[150px] flex items-end justify-between gap-2">
              {moodData.map(({ date, intensity }, index) => (
                <div key={date} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 bg-blue-500 rounded-t transition-all duration-300"
                    style={{ height: `${(intensity / 5) * 100}px` }}
                  />
                  <span className="text-xs text-gray-500 rotate-45 origin-top-left">
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-600">
                  Dominant Mood
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {dominantMood}
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-600">
                  Avg. Intensity
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {avgIntensity.toFixed(1)}/5
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MoodTrends;
