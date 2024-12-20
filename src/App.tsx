import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { MeditationProvider } from "./contexts/MeditationContext";
import LoginPage from "./components/auth/LoginPage";
import Home from "./components/home";
import Navbar from "./components/layout/Navbar";
import ProgressDashboard from "./components/meditation/ProgressDashboard";
import Achievements from "./components/meditation/Achievements";
import ProfilePage from "./components/profile/ProfilePage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        <MeditationProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-gray-50 w-full">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/*"
                  element={ 
                    <>
                      <Navbar />
                      <div className="pt-20 px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                        <Routes>
                          <Route
                            path="/dashboard"
                            element={<Navigate to="/meditate" />}
                          />
                          <Route path="/meditate" element={<Home />} />
                          <Route
                            path="/progress"
                            element={<ProgressDashboard />}
                          />
                          <Route
                            path="/achievements"
                            element={<Achievements />}
                          />
                          <Route path="/profile" element={<ProfilePage />} />
                        </Routes>
                      </div>
                    </>
                  }
                />
              </Routes>
            </div>
            <Toaster />
          </TooltipProvider>
        </MeditationProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
