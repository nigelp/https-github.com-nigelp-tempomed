import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile, Frown, Meh, Heart, Angry, Circle } from "lucide-react";

interface MoodSelectorProps {
  selectedMood?: string;
  onMoodSelect?: (mood: string) => void;
  showDetailedWheel?: boolean;
}

const MoodSelector = ({
  selectedMood = "",
  onMoodSelect = () => {},
  showDetailedWheel = false,
}: MoodSelectorProps) => {
  const quickMoods = [
    { icon: Smile, label: "Happy", color: "text-green-500" },
    { icon: Meh, label: "Calm", color: "text-blue-500" },
    { icon: Heart, label: "Grateful", color: "text-pink-500" },
    { icon: Frown, label: "Sad", color: "text-purple-500" },
    { icon: Angry, label: "Stressed", color: "text-red-500" },
  ];

  const detailedMoods = [
    { label: "Excited", color: "bg-yellow-500" },
    { label: "Peaceful", color: "bg-blue-300" },
    { label: "Content", color: "bg-green-400" },
    { label: "Anxious", color: "bg-orange-400" },
    { label: "Frustrated", color: "bg-red-400" },
    { label: "Tired", color: "bg-purple-400" },
    { label: "Inspired", color: "bg-indigo-400" },
    { label: "Balanced", color: "bg-teal-400" },
  ];

  return (
    <div className="w-[500px] p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">How are you feeling?</h3>

      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="quick">Quick Select</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Wheel</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="mt-0">
          <div className="grid grid-cols-5 gap-4">
            {quickMoods.map((mood) => (
              <Button
                key={mood.label}
                variant="outline"
                className={`flex flex-col items-center p-4 h-auto ${
                  selectedMood === mood.label ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => onMoodSelect(mood.label)}
              >
                <mood.icon className={`w-8 h-8 mb-2 ${mood.color}`} />
                <span className="text-sm">{mood.label}</span>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="mt-0">
          <div className="grid grid-cols-4 gap-3">
            {detailedMoods.map((mood) => (
              <Button
                key={mood.label}
                variant="outline"
                className={`relative flex items-center p-3 h-auto ${
                  selectedMood === mood.label ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => onMoodSelect(mood.label)}
              >
                <Circle
                  className={`w-4 h-4 mr-2 ${mood.color}`}
                  fill="currentColor"
                />
                <span className="text-sm">{mood.label}</span>
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodSelector;
