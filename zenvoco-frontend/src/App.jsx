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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/practice" element={<GuidedPractice />} />
      <Route path="/result" element={<SpeechResult />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/profile" element={<Profile />} />
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