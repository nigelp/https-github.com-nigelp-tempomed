import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MoodSelector from "./MoodSelector";
import SessionRating from "./SessionRating";
import JournalEntry from "./JournalEntry";
import AIInsights from "./AIInsights";

interface PostSessionProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  mood?: string;
  onMoodSelect?: (mood: string) => void;
  rating?: number;
  onRatingChange?: (rating: number) => void;
  journalEntry?: string;
  onJournalChange?: (entry: string) => void;
  isLoading?: boolean;
}

const PostSession = ({
  currentStep = 1,
  onStepChange = () => {},
  onComplete = () => {},
  mood = "",
  onMoodSelect = () => {},
  rating = 0,
  onRatingChange = () => {},
  journalEntry = "",
  onJournalChange = () => {},
  isLoading = false,
}: PostSessionProps) => {
  const totalSteps = 4;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <MoodSelector selectedMood={mood} onMoodSelect={onMoodSelect} />;
      case 2:
        return (
          <SessionRating rating={rating} onRatingChange={onRatingChange} />
        );
      case 3:
        return <JournalEntry value={journalEntry} onChange={onJournalChange} />;
      case 4:
        return <AIInsights isLoading={isLoading} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!mood;
      case 2:
        return rating > 0;
      default:
        return true;
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8">
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Post-Session Reflection
            </h2>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
              }}
            />
          </div>

          {/* Step content */}
          <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center px-2 sm:px-4">
            {renderStepContent()}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => onStepChange(currentStep - 1)}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={() => {
                if (currentStep === totalSteps) {
                  onComplete();
                } else {
                  onStepChange(currentStep + 1);
                }
              }}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              {currentStep === totalSteps ? "Complete" : "Next"}
              {currentStep !== totalSteps && (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostSession;
