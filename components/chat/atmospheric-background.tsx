"use client";

import { motion } from "framer-motion";

export function AtmosphericBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl"
        animate={{ x: [0, 20, -10, 0], y: [0, 14, -8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ x: [0, -20, 15, 0], y: [0, -10, 12, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10rem] left-[30%] h-[32rem] w-[32rem] rounded-full bg-purple-500/18 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.24, 0.36, 0.24] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(3,5,12,0.65)_62%,rgba(3,5,12,0.95)_100%)]" />
    </div>
  );
}
