"use client";
import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div
        className="relative w-20 h-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">Loading</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
