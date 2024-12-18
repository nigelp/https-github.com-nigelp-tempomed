import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import Home from "./components/home";
import Navbar from "./components/layout/Navbar";
import ProgressDashboard from "./components/meditation/ProgressDashboard";
import Achievements from "./components/meditation/Achievements";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <div className="pt-16 px-4 sm:px-6 lg:px-8">
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
                      </Routes>
                    </div>
                  </>
                }
              />
            </Routes>
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
