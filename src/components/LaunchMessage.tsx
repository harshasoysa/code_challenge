"use client";

import { motion } from "framer-motion";

interface LaunchMessageProps {
    onRestartAction: () => void;  // Renamed to follow Next.js rule
}

export default function LaunchMessage({ onRestartAction }: LaunchMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white"
        >
            <h1 className="text-3xl font-bold mb-4">🚀 Launch Successful!</h1>
            <p className="text-lg">Thank you for your effort! 🎉</p>
            <button
                className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"
                onClick={onRestartAction}  // Updated function name
            >
                Restart
            </button>
        </motion.div>
    );
}
