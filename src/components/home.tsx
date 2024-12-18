import React, { useState, useEffect, useCallback } from "react";
import CircularTimer from "./meditation/CircularTimer";
import TimerControls from "./meditation/TimerControls";
import PostSession from "./meditation/PostSession";
import ProgressDashboard from "./meditation/ProgressDashboard";

function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPostSession, setShowPostSession] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds

  // Post-session state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState("");
  const [sessionRating, setSessionRating] = useState(0);
  const [journalEntry, setJournalEntry] = useState("");

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            setShowPostSession(true);
            return 1200; // Reset to 20 minutes
          }
          return time - 1;
        });

        setProgress((prev) => {
          const newProgress = ((1200 - timeRemaining + 1) / 1200) * 100;
          return Math.min(newProgress, 100);
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setProgress(0);
    setTimeRemaining(1200);
    setShowPostSession(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setProgress(0);
    setTimeRemaining(1200);
  };

  const handlePostSessionComplete = () => {
    setShowPostSession(false);
    setShowDashboard(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {!showPostSession && !showDashboard && (
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
                onPause={handlePause}
                onStop={handleStop}
                onReset={handleReset}
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

          {showDashboard && (
            <ProgressDashboard
              streakData={{
                currentStreak: 3,
                longestStreak: 7,
                daysThisWeek: 4,
                totalDays: 15,
              }}
              moodData={[
                { date: "2024-01-01", mood: "Calm", intensity: 4 },
                { date: "2024-01-02", mood: "Happy", intensity: 5 },
                { date: "2024-01-03", mood: "Stressed", intensity: 2 },
                { date: "2024-01-04", mood: "Peaceful", intensity: 4 },
                { date: "2024-01-05", mood: "Grateful", intensity: 5 },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
