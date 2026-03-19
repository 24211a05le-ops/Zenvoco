import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
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
  );
}

export default App;