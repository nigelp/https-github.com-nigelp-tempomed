import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Medal, Target, Heart, Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  progress: number;
  isUnlocked: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Star,
  Trophy,
  Medal,
  Target,
  Heart,
  Brain,
};

const Achievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAchievements = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        // Get all achievements
        const { data: achievementsData, error: achievementsError } =
          await supabase.from("achievements").select("*");

        if (achievementsError) throw achievementsError;

        // Get user's unlocked achievements
        const { data: unlockedData, error: unlockedError } = await supabase
          .from("user_achievements")
          .select("achievement_id")
          .eq("user_id", user.id);

        if (unlockedError) throw unlockedError;

        // Calculate progress for each achievement
        const achievementsWithProgress = await Promise.all(
          achievementsData.map(async (achievement) => {
            let progress = 0;

            // Calculate progress based on requirement type
            switch (achievement.requirement_type) {
              case "morning_sessions": {
                const { count } = await supabase
                  .from("meditation_sessions")
                  .select("*", { count: "exact" })
                  .eq("user_id", user.id)
                  .gte("created_at", new Date().setHours(5, 0, 0, 0))
                  .lte("created_at", new Date().setHours(12, 0, 0, 0));
                progress = count || 0;
                break;
              }
              case "streak": {
                const { data } = await supabase
                  .from("streaks")
                  .select("current_streak")
                  .eq("user_id", user.id)
                  .single();
                progress = data?.current_streak || 0;
                break;
              }
              case "mood_count": {
                const { count } = await supabase
                  .from("meditation_sessions")
                  .select("*", { count: "exact" })
                  .eq("user_id", user.id)
                  .eq("mood", "Calm");
                progress = count || 0;
                break;
              }
              case "total_days": {
                const { count } = await supabase
                  .from("meditation_sessions")
                  .select("*", { count: "exact" })
                  .eq("user_id", user.id);
                progress = count || 0;
                break;
              }
              // Add other cases as needed
            }

            return {
              ...achievement,
              progress,
              isUnlocked:
                unlockedData?.some(
                  (u) => u.achievement_id === achievement.id,
                ) || false,
            };
          }),
        );

        setAchievements(achievementsWithProgress);
      } catch (error) {
        console.error("Error loading achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAchievements();
  }, [user]);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-medium">Achievements</h3>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => {
          const Icon = iconMap[achievement.icon] || Trophy;

          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border ${achievement.isUnlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${achievement.isUnlocked ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {achievement.title}
                    </h4>
                    {achievement.isUnlocked && (
                      <Badge variant="secondary" className="text-xs">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {achievement.description}
                  </p>
                  {!achievement.isUnlocked && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{
                            width: `${(achievement.progress / achievement.requirement_value) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.progress}/{achievement.requirement_value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Achievements;
