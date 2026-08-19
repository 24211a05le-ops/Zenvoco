import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import GuidedPractice from "./pages/GuidedPractice";
import SpeechResult from "./pages/SpeechResult";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import LearnMode from "./pages/LearnMode";
import ListenMode from "./pages/ListenMode";
import DailyTask from "./pages/DailyTask";
import VivaSimulation from "./pages/VivaSimulation";
import DailyCheckIn from "./pages/DailyCheckIn";

import ProtectedRoute from "./components/ProtectedRoute";

const routeMetadata = {
  "/": {
    title: "Zenvoco – AI Communication Confidence Coach for Students",
    description: "Build communication confidence with AI-powered English speaking practice, public speaking coaching, interview preparation, and viva support for students.",
    robots: "index, follow"
  },
  "/login": { title: "Sign In | Zenvoco", robots: "noindex, nofollow" },
  "/register": { title: "Create Your Account | Zenvoco", robots: "noindex, nofollow" },
  "/onboarding": { title: "Get Started | Zenvoco", robots: "noindex, nofollow" },
  "/dashboard": { title: "Dashboard | Zenvoco", robots: "noindex, nofollow" },
  "/practice": { title: "Communication Practice | Zenvoco", robots: "noindex, nofollow" },
  "/progress": { title: "Progress | Zenvoco", robots: "noindex, nofollow" },
  "/profile": { title: "Profile | Zenvoco", robots: "noindex, nofollow" },
  "/result": { title: "Speech Results | Zenvoco", robots: "noindex, nofollow" },
  "/learn": { title: "Learn Communication Skills | Zenvoco", robots: "noindex, nofollow" },
  "/listen": { title: "Listening Practice | Zenvoco", robots: "noindex, nofollow" },
  "/daily-task": { title: "Daily Task | Zenvoco", robots: "noindex, nofollow" },
  "/viva": { title: "Viva Simulation | Zenvoco", robots: "noindex, nofollow" },
  "/checkin": { title: "Daily Check-In | Zenvoco", robots: "noindex, nofollow" }
};

function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = routeMetadata[pathname] || {
      title: "Zenvoco – AI Communication Confidence Coach for Students",
      robots: "noindex, nofollow"
    };

    document.title = metadata.title;

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = metadata.robots;

    if (metadata.description) {
      let description = document.querySelector('meta[name="description"]');
      if (!description) {
        description = document.createElement("meta");
        description.name = "description";
        document.head.appendChild(description);
      }
      description.content = metadata.description;
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <RouteSeo />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><GuidedPractice /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/result" element={<ProtectedRoute><SpeechResult /></ProtectedRoute>} />
        <Route path="/learn" element={<ProtectedRoute><LearnMode /></ProtectedRoute>} />
        <Route path="/listen" element={<ProtectedRoute><ListenMode /></ProtectedRoute>} />
        <Route path="/daily-task" element={<ProtectedRoute><DailyTask /></ProtectedRoute>} />
        <Route path="/viva" element={<ProtectedRoute><VivaSimulation /></ProtectedRoute>} />
        <Route path="/checkin" element={<ProtectedRoute><DailyCheckIn /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;