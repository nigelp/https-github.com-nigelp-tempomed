import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Smile, Frown, Meh, Heart, Angry, Circle } from "lucide-react";

interface MoodSelectorProps {
  selectedMood?: string[];
  onMoodSelect?: (mood: string[]) => void;
  showDetailedWheel?: boolean;
}

export const MoodSelector: FC<MoodSelectorProps> = ({
  selectedMood = [],
  onMoodSelect = () => {},
  showDetailedWheel = false,
}: MoodSelectorProps) => {
  const quickMoods = [
    { icon: Frown, label: "Sad", color: "text-purple-500", bgColor: "bg-purple-100" },
    { icon: Meh, label: "Low", color: "text-red-500", bgColor: "bg-red-100" },
    { icon: Meh, label: "Calm", color: "text-blue-500", bgColor: "bg-blue-100" },
    { icon: Smile, label: "Happy", color: "text-green-500", bgColor: "bg-green-100" },
    { icon: Heart, label: "Joy", color: "text-pink-500", bgColor: "bg-pink-100" },
  ];

  const detailedMoods = [
    { label: "Excited", color: "text-yellow-500", bgColor: "bg-yellow-100" },
    { label: "Peaceful", color: "text-blue-400", bgColor: "bg-blue-50" },
    { label: "Content", color: "text-green-400", bgColor: "bg-green-50" },
    { label: "Anxious", color: "text-orange-400", bgColor: "bg-orange-50" },
    { label: "Frustrated", color: "text-red-400", bgColor: "bg-red-50" },
    { label: "Tired", color: "text-purple-400", bgColor: "bg-purple-50" },
    { label: "Inspired", color: "text-indigo-400", bgColor: "bg-indigo-50" },
    { label: "Balanced", color: "text-teal-400", bgColor: "bg-teal-50" },
  ];

  const handleMoodToggle = (mood: string) => {
    const isQuickMood = quickMoods.some(m => m.label === mood);
    const isDetailedMood = detailedMoods.some(m => m.label === mood);
    
    let newMoods = [...selectedMood];
    
    if (isQuickMood) {
      // For quick moods, only allow one selection
      newMoods = selectedMood.includes(mood) 
        ? newMoods.filter(m => !quickMoods.some(qm => qm.label === m))
        : [...newMoods.filter(m => !quickMoods.some(qm => qm.label === m)), mood];
    } else if (isDetailedMood) {
      // For detailed moods, allow max two selections
      const currentDetailedMoods = newMoods.filter(m => detailedMoods.some(dm => dm.label === m));
      newMoods = selectedMood.includes(mood)
        ? newMoods.filter(m => m !== mood)
        : currentDetailedMoods.length < 2 ? [...newMoods, mood] : newMoods;
    }
    
    onMoodSelect(newMoods);
  };

  return (
    <div className="w-full max-w-[400px] p-4 sm:p-6 bg-white rounded-lg">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">How are you feeling?</h3>
          <p className="text-sm text-gray-500 mb-4">Select one primary mood and up to two additional feelings</p>
        </div>

      <div className="flex justify-center gap-1">
        {quickMoods.map((mood) => (
          <Button
            key={mood.label} 
            variant="ghost"
            className={`p-0.5 h-auto rounded-lg transition-all duration-200 min-w-[42px] ${
              selectedMood.includes(mood.label) 
                ? `${mood.bgColor} hover:${mood.bgColor}` 
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleMoodToggle(mood.label)}
          >
            <div className="flex flex-col items-center gap-1">
              <mood.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${mood.color}`} />
              <span className="text-[10px] font-medium leading-none">{mood.label}</span>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="mt-5 sm:mt-6">
        <div className="text-sm font-medium text-gray-600 mb-2 text-center">More options:</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {detailedMoods.map((mood) => (
            <Button
              key={mood.label}
              variant="ghost"
              size="sm"
              className={`px-3 py-2 h-auto rounded-lg transition-all duration-200 flex justify-start ${
                selectedMood.includes(mood.label) 
                  ? `${mood.bgColor} hover:${mood.bgColor}` 
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleMoodToggle(mood.label)}
            >
              <div className="flex items-center gap-2">
                <Circle className={`w-3 h-3 flex-shrink-0 ${mood.color}`} fill="currentColor" />
                <span className="text-sm">{mood.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
      
      {selectedMood.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-600 text-center mb-2">Selected moods:</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedMood.map((mood) => (
              <span key={mood} className="text-sm bg-gray-100 px-2 py-1 rounded-md">{mood}</span>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
