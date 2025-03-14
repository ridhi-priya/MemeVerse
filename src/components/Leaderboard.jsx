import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";

function Leaderboard() {
  const [topMemes, setTopMemes] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Fetch and store memes only once (constant ranking)
  useEffect(() => {
    async function fetchTopMemes() {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        const sortedMemes = response.data.data.memes
          .slice(0, 10) // Keep the first 10 memes constant
          .map((meme, index) => ({
            ...meme,
            likes: 5000 - index * 250, // Assigning constant decreasing likes
          }));
        setTopMemes(sortedMemes);
      } catch (error) {
        console.error("Error fetching top memes:", error);
      }
    }
    fetchTopMemes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h1 className="text-4xl font-bold text-center mb-8">🏆 Leaderboard</h1>

      {/* Top 10 Most Liked Memes (Constant Ranking) */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🔥 Top 10 Liked Memes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topMemes.map((meme, index) => (
            <motion.div
              key={meme.id}
              className={`rounded-lg overflow-hidden shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{meme.name}</h3>
                <p className="text-sm opacity-80">❤️ {meme.likes} Likes</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* User Rankings (Matching Meme Names) */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🎖️ User Rankings</h2>
        <div className={`rounded-lg p-6 shadow-md ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
          {topMemes.map((meme, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center p-3 border-b dark:border-gray-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="font-medium">
                #{index + 1} {meme.name}
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {meme.likes} Points
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Leaderboard;
