import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Medal, Target, Heart, Brain } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  isUnlocked: boolean;
}

interface AchievementsProps {
  achievements?: Achievement[];
}

const Achievements = ({
  achievements = [
    {
      id: "1",
      title: "Early Bird",
      description: "Complete 5 morning meditations",
      icon: Star,
      progress: 3,
      isUnlocked: false,
    },
    {
      id: "2",
      title: "Zen Master",
      description: "Achieve a 10-day streak",
      icon: Trophy,
      progress: 7,
      isUnlocked: false,
    },
    {
      id: "3",
      title: "Inner Peace",
      description: "Log 20 calm moods",
      icon: Heart,
      progress: 20,
      isUnlocked: true,
    },
    {
      id: "4",
      title: "Mindful Explorer",
      description: "Try 5 different meditation types",
      icon: Brain,
      progress: 3,
      isUnlocked: false,
    },
    {
      id: "5",
      title: "Consistency King",
      description: "Meditate for 30 days total",
      icon: Medal,
      progress: 15,
      isUnlocked: false,
    },
    {
      id: "6",
      title: "Goal Setter",
      description: "Complete all weekly goals",
      icon: Target,
      progress: 5,
      isUnlocked: false,
    },
  ],
}: AchievementsProps) => {
  return (
    <div className="w-[300px] bg-white rounded-lg shadow-sm">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-medium">Achievements</h3>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border ${achievement.isUnlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${achievement.isUnlocked ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}
                >
                  <achievement.icon className="w-4 h-4" />
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
                            width: `${(achievement.progress / 20) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.progress}/20
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Achievements;
