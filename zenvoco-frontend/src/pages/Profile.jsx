import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/api";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    purpose: "",
    level: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Feedback State
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const purposes = [
    "Interview Preparation",
    "Presentation Skills",
    "Viva Preparation",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const fetchProfile = async () => {
    try {
      const response = await API.get(`/user/profile`);
      const data = response.data;
      setProfile(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        password: "", // Don't show password
        purpose: data.purpose || "",
        level: data.level || ""
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      // Create update object, only include non-empty password
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      await API.put(`/user/profile`, updateData);
      
      // Update local storage if name changed (since other pages might use it)
      if (formData.name) localStorage.setItem("name", formData.name);
      if (formData.purpose) localStorage.setItem("purpose", formData.purpose);
      if (formData.level) localStorage.setItem("level", formData.level);

      setIsEditing(false);
      await fetchProfile();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackComment.trim()) return;

    setFeedbackLoading(true);
    try {
      await API.post("/user/feedback", { comment: feedbackComment, rating: feedbackRating });
      setFeedbackComment("");
      setFeedbackRating(5);
      setFeedbackSuccess(true);
      setTimeout(() => setFeedbackSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-gray-900 dark:text-white p-10">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">

        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Profile Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your account and preferences.
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-8 md:p-10 space-y-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all outline-none"
                  placeholder="Leave blank to keep current"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Goal / Purpose</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select Purpose</option>
                  {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Experience Level</label>
                <div className="flex gap-3">
                  {levels.map(l => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setFormData({...formData, level: l})}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                        formData.level === l 
                        ? "bg-[#0ea5e9]/10 border-[#0ea5e9] text-[#0ea5e9]" 
                        : "bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-500"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 font-medium text-sm ml-1">{error}</p>}

            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-gray-800">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-2xl font-black transition-all shadow-[0_4px_14px_0_rgb(14,165,233,0.3)] disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                }}
                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 dark:text-white rounded-2xl font-black transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="w-28 h-28 shrink-0 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#2dd4bf] p-1 shadow-[0_4px_14px_0_rgb(14,165,233,0.39)]">
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-4xl font-black text-slate-800 dark:text-white uppercase">
                {profile.name?.charAt(0) || "U"}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black text-[#0f172a] dark:text-white mb-1 tracking-tight">
                {profile.name || "User"}
              </h3>

              <p className="text-slate-500 font-medium mb-4">
                {profile.email || "email@example.com"}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {profile.purpose && (
                  <span className="bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                    {profile.purpose}
                  </span>
                )}
                {profile.level && (
                  <span className="bg-[#2dd4bf]/10 text-[#0d9488] dark:text-[#2dd4bf] border border-[#2dd4bf]/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                    {profile.level}
                  </span>
                )}
              </div>
            </div>

            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-white hover:bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-white rounded-full transition-all font-bold border border-[#0ea5e9]/20 shadow-sm mt-4 md:mt-0"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* FEEDBACK SECTION */}
        <div className="bg-[#0ea5e9]/5 dark:bg-[#0ea5e9]/5 border border-[#0ea5e9]/10 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
             <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#0ea5e9]/10 rounded-full blur-3xl"></div>
             
             <h3 className="text-2xl font-black text-[#0f172a] dark:text-white mb-2 tracking-tight">Share Your Experience</h3>
             <p className="text-slate-500 dark:text-gray-400 mb-8 font-medium">Your feedback helps us improve and inspires others in the community!</p>

             <form onSubmit={handleFeedbackSubmit} className="space-y-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Rating</label>
                  <div className="flex gap-2 text-3xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className={`transition-all hover:scale-125 ${star <= feedbackRating ? "text-yellow-400" : "text-slate-300 dark:text-gray-700"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Tell us what you love about Zenvoco or how we can improve..."
                  className="w-full px-5 py-4 bg-white dark:bg-gray-800 border border-[#0ea5e9]/20 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-[#0ea5e9]/30 focus:border-[#0ea5e9]/50 transition-all outline-none min-h-[120px] shadow-inner text-slate-700 dark:text-white"
                />
                
                {feedbackSuccess && (
                  <p className="text-green-500 font-bold bg-green-500/10 py-3 px-5 rounded-xl border border-green-500/20 animate-bounce">
                    ✨ Thank you for the feedback! Your review is now live on the homepage.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={feedbackLoading || !feedbackComment.trim()}
                  className="px-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-full font-black transition-all shadow-[0_4px_14px_0_rgb(14,165,233,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  {feedbackLoading ? "Submitting..." : (
                    <>
                      <span>Submit Experience</span>
                      <span className="text-xl">🚀</span>
                    </>
                  )}
                </button>
             </form>
        </div>

        {/* Logout */}
        <div className="pt-6">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              localStorage.removeItem("purpose");
              localStorage.removeItem("level");
              navigate("/");
            }}
            className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition-all w-full md:w-auto shadow-[0_4px_14px_0_rgb(239,68,68,0.39)] transform hover:-translate-y-0.5"
          >
            Sign Out
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;