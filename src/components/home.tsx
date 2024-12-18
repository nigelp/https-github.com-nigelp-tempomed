import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CircularTimer from "./meditation/CircularTimer";
import TimerControls from "./meditation/TimerControls";
import PostSession from "./meditation/PostSession";
import { useMeditation } from "@/contexts/MeditationContext";

function Home() {
  const { toast } = useToast();
  const {
    isActive,
    isPaused,
    timeRemaining,
    progress,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    resetSession,
    completeSession,
  } = useMeditation();

  const [showPostSession, setShowPostSession] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState("");
  const [sessionRating, setSessionRating] = useState(0);
  const [journalEntry, setJournalEntry] = useState("");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    startSession(1200); // 20 minutes
  };

  const handleStop = () => {
    stopSession();
    setShowPostSession(true);
  };

  const handlePostSessionComplete = async () => {
    try {
      await completeSession(selectedMood, sessionRating, journalEntry);
      setShowPostSession(false);
      toast({
        title: "Session completed!",
        description: "Your meditation session has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {!showPostSession && (
            <>
              <CircularTimer
                progress={progress}
                timeRemaining={formatTime(timeRemaining)}
                isActive={isActive}
              />
              <TimerControls
                isActive={isActive}
                isPaused={isPaused}
                onStart={handleStart}
                onPause={pauseSession}
                onResume={resumeSession}
                onStop={handleStop}
                onReset={resetSession}
              />
            </>
          )}

          {showPostSession && (
            <PostSession
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              onComplete={handlePostSessionComplete}
              mood={selectedMood}
              onMoodSelect={setSelectedMood}
              rating={sessionRating}
              onRatingChange={setSessionRating}
              journalEntry={journalEntry}
              onJournalChange={setJournalEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
