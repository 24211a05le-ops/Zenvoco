import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import GuidedPractice from "./pages/GuidedPractice"
import Progress from "./pages/Progress"
import Profile from "./pages/Profile"
import VivaSimulation from "./pages/VivaSimulation";
import LearnMode from "./pages/LearnMode";
import SpeechResult from "./pages/SpeechResult";
import Onboarding from "./pages/Onboarding";
import ListenMode from "./pages/ListenMode";
import DailyTask from "./pages/DailyTask";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guided-practice" element={<GuidedPractice />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Viva" element={<VivaSimulation />} />
        <Route path="/learn" element={<LearnMode />} />
        <Route path="/result" element={<SpeechResult />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/listen" element={<ListenMode />} />
        <Route path="/daily-task" element={<DailyTask />} />
      </Routes>
    </>
  )
}

export default App