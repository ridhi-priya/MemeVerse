import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

function Home() {
  const [memes, setMemes] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Fetch dark mode state

  async function fetchNewMemes() {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const shuffledMemes = response.data.data.memes.sort(() => 0.5 - Math.random());
      setMemes(shuffledMemes.slice(0, 9));
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  }

  useEffect(() => {
    fetchNewMemes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`space-y-8 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700"}`} // Apply theme
    >
      <div className="min-h-screen flex flex-col items-center p-6">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🔥 Trending Memes
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={memes.map(meme => meme.id).join()} // This ensures re-render animation
          >
            {memes.map((meme, index) => (
              <motion.div
                key={meme.id}
                className={`rounded-lg overflow-hidden shadow-lg ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={meme.url} alt={meme.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{meme.name}</h2>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={fetchNewMemes}
          className={`mt-6 px-6 py-3 font-bold rounded-lg shadow-md transition ${
            isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Load New Memes 🔄
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Home;
