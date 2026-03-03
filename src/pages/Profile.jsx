import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";


const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);


  const [user, setUser] = useState({
    name: "xyz",
    email: "xyz@gmail.com",
    level: "Intermediate",
    purpose: "Interview Preparation",
    sessions: 12,
    avgConfidence: 72,
  });

  const [tempUser, setTempUser] = useState(user);

  const handleChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Profile</h2>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* Profile Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>

          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={tempUser.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 mb-2 text-white"
                />
                <input
                  type="email"
                  name="email"
                  value={tempUser.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
                />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-blue-400 mt-2">{user.purpose}</p>
              </>
            )}
          </div>
        </div>

        {/* Editable Fields */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Purpose */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Purpose</p>
            {isEditing ? (
              <select
                name="purpose"
                value={tempUser.purpose}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
              >
                <option>Interview Preparation</option>
                <option>Presentation Skills</option>
                <option>Viva Preparation</option>
              </select>
            ) : (
              <p className="text-lg font-semibold text-blue-400">
                {user.purpose}
              </p>
            )}
          </div>

          {/* Confidence Level */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Confidence Level</p>
            {isEditing ? (
              <select
                name="level"
                value={tempUser.level}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            ) : (
              <p className="text-lg font-semibold text-purple-400">
                {user.level}
              </p>
            )}
          </div>

        </div>

        {/* Stats Section (Read Only) */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Total Sessions</p>
            <p className="text-xl font-bold text-green-500 mt-2">
              {user.sessions}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Average Confidence</p>
            <p className="text-xl font-bold text-blue-500 mt-2">
              {user.avgConfidence}%
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
              Edit Profile
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition">       
            Logout
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;