  import React, { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import axios from "axios";

  function Explorer() {
    const [memes, setMemes] = useState([]);
    const [visibleMemes, setVisibleMemes] = useState(6);
    const [category, setCategory] = useState("Trending");
    const [sortBy, setSortBy] = useState("likes");

    useEffect(() => {
      fetchMemes();
    }, []);

    const fetchMemes = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        const shuffledMemes = response.data.data.memes.sort(() => 0.5 - Math.random());
        setMemes(shuffledMemes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    const loadMoreMemes = () => {
      setVisibleMemes((prev) => prev + 6);
    };

    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
        <h1 className="text-4xl font-bold text-center dark:text-white">Explore Memes</h1>
         {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          {['Trending', 'New', 'Classic', 'Random'].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        {/* <input
          type="text"
          placeholder="Search memes..."
          className="p-2 border rounded-md dark:bg-gray-700 w-1/3 dark:text-white"
          onChange={(e) => debouncedSearch(e.target.value)}
        /> */}
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          {['likes', 'date', 'comments'].map((sort) => (
            <option key={sort} value={sort}>Sort by {sort}</option>
          ))}
        </select>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {memes.slice(0, visibleMemes).map((meme) => (
            <motion.div
              key={meme.id}
              className="rounded-lg shadow-lg p-4 bg-gray-100 dark:bg-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-lg font-semibold mt-2 dark:text-white">{meme.name}</h2>
            </motion.div>
          ))}
        </div>

        {visibleMemes < memes.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreMemes}
              className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Load More Memes
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  export default Explorer;
