import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, CalendarDays, Trophy } from "lucide-react";
import StreakCounter from "./StreakCounter";
import MoodTrends from "./MoodTrends";
import Achievements from "./Achievements";
import { useMeditation } from "@/contexts/MeditationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  daysThisWeek: number;
  totalDays: number;
}

interface MoodData {
  date: string;
  mood: string;
  intensity: number;
}

const ProgressDashboard = () => {
  const { user } = useAuth();
  const { recentSessions } = useMeditation();
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "week" | "month" | "year"
  >("week");
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    daysThisWeek: 0,
    totalDays: 0,
  });
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        // Load streak data
        const { data: streakData } = await supabase
          .from("streaks")
          .select("*")
          .eq("user_id", user.id)
          .single();

        // Calculate days this week
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const { data: weekSessions } = await supabase
          .from("meditation_sessions")
          .select("created_at")
          .eq("user_id", user.id)
          .gte("created_at", startOfWeek.toISOString())
          .order("created_at", { ascending: false });

        // Get total days meditated
        const { count: totalDays } = await supabase
          .from("meditation_sessions")
          .select("created_at", { count: "exact" })
          .eq("user_id", user.id);

        setStreakData({
          currentStreak: streakData?.current_streak || 0,
          longestStreak: streakData?.longest_streak || 0,
          daysThisWeek: weekSessions?.length || 0,
          totalDays: totalDays || 0,
        });

        // Load mood data based on time range
        const rangeStart = new Date();
        if (selectedTimeRange === "week") {
          rangeStart.setDate(rangeStart.getDate() - 7);
        } else if (selectedTimeRange === "month") {
          rangeStart.setMonth(rangeStart.getMonth() - 1);
        } else {
          rangeStart.setFullYear(rangeStart.getFullYear() - 1);
        }

        const { data: moodSessions } = await supabase
          .from("meditation_sessions")
          .select("created_at, mood, rating")
          .eq("user_id", user.id)
          .gte("created_at", rangeStart.toISOString())
          .order("created_at", { ascending: true });

        setMoodData(
          moodSessions?.map((session) => ({
            date: new Date(session.created_at).toISOString().split("T")[0],
            mood: session.mood || "Unknown",
            intensity: session.rating || 3,
          })) || [],
        );
      } catch (error) {
        console.error("Error loading progress data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, selectedTimeRange]);

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
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
                setSelectedTimeRange(range as "week" | "month" | "year")
              }
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <StreakCounter {...streakData} />
          <MoodTrends
            moodData={moodData}
            timeRange={selectedTimeRange}
            isLoading={isLoading}
          />
        </div>
        <Achievements />
      </div>
    </div>
  );
};

export default ProgressDashboard;
