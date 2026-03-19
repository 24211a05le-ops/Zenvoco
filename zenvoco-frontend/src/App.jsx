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
import Results from "./pages/Results";
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
      
      {/* Other routes (might need protection later, keeping as is for now) */}
      <Route path="/result" element={<SpeechResult />} />
      <Route path="/learn" element={<LearnMode />} />
      <Route path="/listen" element={<ListenMode />} />
      <Route path="/daily-task" element={<DailyTask />} />
      <Route path="/viva" element={<VivaSimulation />} />
      <Route path="/checkin" element={<DailyCheckIn />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;