import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

function MemeDetails() {
  const { id } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="text-4xl font-bold text-center dark:text-white">Meme Details: {id}</h1>
    </motion.div>
  );
}

export default MemeDetails;