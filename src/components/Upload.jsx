import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function Upload() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [memeTitle, setMemeTitle] = useState("");
  const [memeImageUrl, setMemeImageUrl] = useState("");

  const handleMemeUpload = () => {
    if (!memeImageUrl || !memeTitle) {
      alert("Please enter an image URL and a title!");
      return;
    }

    const newMeme = {
      id: Date.now(),
      title: memeTitle,
      imageUrl: memeImageUrl,
    };

    const storedMemes = JSON.parse(localStorage.getItem("userMemes")) || [];
    const updatedMemes = [...storedMemes, newMeme];
    localStorage.setItem("userMemes", JSON.stringify(updatedMemes));

    setMemeTitle("");
    setMemeImageUrl("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center">Upload Meme</h1>
        <div className="flex flex-col items-center space-y-4 mt-6">
          <input
            type="text"
            placeholder="Enter meme title"
            value={memeTitle}
            onChange={(e) => setMemeTitle(e.target.value)}
            className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Enter meme image URL"
            value={memeImageUrl}
            onChange={(e) => setMemeImageUrl(e.target.value)}
            className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={handleMemeUpload}
            className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 transition"
          >
            Upload Meme 🚀
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Upload;
