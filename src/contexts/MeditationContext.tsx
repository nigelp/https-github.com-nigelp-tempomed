import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabase";

interface MeditationSession {
  id?: string;
  duration: number;
  completed: boolean;
  mood?: string;
  rating?: number;
  journalText?: string;
}

interface MeditationContextType {
  currentSession: MeditationSession | null;
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  progress: number;
  startSession: (duration: number) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  stopSession: () => void;
  resetSession: () => void;
  completeSession: (
    mood: string,
    rating: number,
    journalText?: string,
  ) => Promise<void>;
  recentSessions: MeditationSession[];
  loadRecentSessions: () => Promise<void>;
}

const MeditationContext = createContext<MeditationContextType | undefined>(
  undefined,
);

export function MeditationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [currentSession, setCurrentSession] =
    useState<MeditationSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes default
  const [progress, setProgress] = useState(0);
  const [recentSessions, setRecentSessions] = useState<MeditationSession[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            setCurrentSession((prev) =>
              prev ? { ...prev, completed: true } : null,
            );
            return 0;
          }
          return time - 1;
        });

        setProgress((prev) => {
          const newProgress =
            (((currentSession?.duration || 1200) - timeRemaining + 1) /
              (currentSession?.duration || 1200)) *
            100;
          return Math.min(newProgress, 100);
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining, currentSession]);

  const startSession = (duration: number = 1200) => {
    setCurrentSession({
      duration,
      completed: false,
    });
    setTimeRemaining(duration);
    setProgress(0);
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseSession = () => {
    setIsPaused(true);
  };

  const resumeSession = () => {
    setIsPaused(false);
  };

  const stopSession = () => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentSession((prev) => (prev ? { ...prev, completed: true } : null));
  };

  const resetSession = () => {
    setIsActive(false);
    setIsPaused(false);
    setProgress(0);
    setTimeRemaining(currentSession?.duration || 1200);
  };

  const completeSession = async (
    mood: string,
    rating: number,
    journalText?: string,
  ) => {
    if (!user || !currentSession) return;

    const completedSession = {
      user_id: user.id,
      duration: currentSession.duration,
      completed: true,
      mood,
      rating,
      journal_text: journalText,
    };

    const { error } = await supabase
      .from("meditation_sessions")
      .insert([completedSession]);

    if (error) throw error;

    // Update streaks
    const today = new Date().toISOString().split("T")[0];
    const { data: streakData } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (streakData) {
      const lastDate = streakData.last_meditation_date;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      let newStreak = streakData.current_streak;
      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }

      const { error: streakError } = await supabase
        .from("streaks")
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, streakData.longest_streak),
          last_meditation_date: today,
        })
        .eq("user_id", user.id);

      if (streakError) throw streakError;
    }

    await loadRecentSessions();
  };

  const loadRecentSessions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("meditation_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    setRecentSessions(data || []);
  };

  useEffect(() => {
    if (user) {
      loadRecentSessions();
    }
  }, [user]);

  const value = {
    currentSession,
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
    recentSessions,
    loadRecentSessions,
  };

  return (
    <MeditationContext.Provider value={value}>
      {children}
    </MeditationContext.Provider>
  );
}

export function useMeditation() {
  const context = useContext(MeditationContext);
  if (context === undefined) {
    throw new Error("useMeditation must be used within a MeditationProvider");
  }
  return context;
}
