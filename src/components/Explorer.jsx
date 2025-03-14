import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import debounce from "lodash.debounce";

function Explorer() {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Trending");
  const [sortBy, setSortBy] = useState("likes");

  // 🔹 Fetch memes when filters, search, or sort changes
  useEffect(() => {
    setPage(1);
    fetchMemes(1, true);
  }, [category, sortBy, searchQuery]);

  // 🔹 Fetch Memes API Call
  const fetchMemes = async (pageNumber, reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.example.com/memes?page=${pageNumber}&category=${category}&sortBy=${sortBy}&search=${searchQuery}`
      );

      if (response.data.length === 0) setHasMore(false);
      setMemes((prev) => (reset ? response.data : [...prev, ...response.data]));
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
    setLoading(false);
  };

  // 🔹 Infinite Scrolling
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (page > 1) fetchMemes(page);
  }, [page]);

  // 🔹 Debounced Search
  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 500),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <h1 className="text-4xl font-bold text-center">Meme Explorer</h1>

      {/* Filters & Search */}
      <div className="flex justify-between items-center mt-4 gap-4">
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700"
        >
          {["Trending", "New", "Classic", "Random"].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search memes..."
          className="p-2 border rounded-md dark:bg-gray-700"
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        {/* Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700"
        >
          {["likes", "date", "comments"].map((sort) => (
            <option key={sort} value={sort}>
              Sort by {sort}
            </option>
          ))}
        </select>
      </div>

      {/* Meme List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {memes.map((meme) => (
          <motion.div
            key={meme.id}
            className="rounded-lg shadow-lg p-4 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{meme.title}</h2>
            <p className="text-sm">
              ❤️ {meme.likes} | 💬 {meme.comments}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && <p className="text-center mt-4">Loading memes...</p>}
    </motion.div>
  );
}

export default Explorer;
