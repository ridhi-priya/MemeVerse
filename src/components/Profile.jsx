import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function Profile() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const storedProfile = JSON.parse(localStorage.getItem("userProfile")) || {
    name: "John Doe",
    bio: "Meme Enthusiast | React Developer",
    profilePic: "",
  };

  const storedMemes = JSON.parse(localStorage.getItem("userMemes")) || [];

  const [profile, setProfile] = useState(storedProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [memes, setMemes] = useState(storedMemes);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleDeleteMeme = (id) => {
    const updatedMemes = memes.filter((meme) => meme.id !== id);
    setMemes(updatedMemes);
    localStorage.setItem("userMemes", JSON.stringify(updatedMemes));
  };

  const handleEditMeme = (index) => {
    setEditIndex(index);
    setEditTitle(memes[index].title);
  };

  const handleSaveEditMeme = (index) => {
    const updatedMemes = [...memes];
    updatedMemes[index].title = editTitle;
    setMemes(updatedMemes);
    localStorage.setItem("userMemes", JSON.stringify(updatedMemes));
    setEditIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Profile Section */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">👤 Profile</h1>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={profile.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />

          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600"
              />
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                onClick={handleSaveProfile}
                className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 transition"
              >
                Save Profile 💾
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Profile ✏️
              </button>
            </>
          )}
        </div>
      </div>

      {/* Uploaded Memes Section */}
      {memes.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">🔥 Uploaded Memes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {memes.map((meme, index) => (
              <motion.div
                key={meme.id}
                className="rounded-lg overflow-hidden shadow-lg p-4 bg-gray-100 dark:bg-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={meme.imageUrl}
                  alt={meme.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="p-2">
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="p-2 border rounded-md w-full dark:bg-gray-600 dark:border-gray-500"
                      />
                      <button
                        onClick={() => handleSaveEditMeme(index)}
                        className="mt-2 px-4 py-1 bg-green-500 text-white rounded-md"
                      >
                        Save ✅
                      </button>
                    </>
                  ) : (
                    <h2 className="text-lg font-semibold">{meme.title}</h2>
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEditMeme(index)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Edit ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteMeme(meme.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-md"
                  >
                    Delete ❌
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Profile;
