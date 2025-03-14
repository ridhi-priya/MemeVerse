import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center space-y-8 min-h-[60vh]"
    >
      <h1 className="text-6xl font-bold text-center dark:text-white">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-300">Oops! Even the things we love break sometimes... like this page</p>
      {/* Oops! This meme has ascended to another dimension. */}
      <Link to="/" className="btn btn-primary">
        Back to Reality 🤍
      </Link>
    </motion.div>
  );
}

export default NotFound;