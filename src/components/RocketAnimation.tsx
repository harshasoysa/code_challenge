"use client";

import { motion } from "framer-motion";
import RocketSVG from "@/img/RocketSVG";
import FlameSVG from "@/img/FlameSVG";

interface RocketAnimationProps {
    isRunning: boolean;
    onLaunchComplete: () => void;
}

export default function RocketAnimation({ isRunning, onLaunchComplete }: RocketAnimationProps) {
    return (
        <div className="w-full flex items-center justify-center h-full relative">
            <motion.div
                className="relative w-24 h-24 z-30"
                animate={
                    isRunning
                        ? {y: [-20, -600], opacity: [1, 1, 1, 0]}
                        : {rotate: [-5, 5, -5], transition: {repeat: Infinity, duration: 3, ease: "easeInOut"}}
                }
                transition={isRunning ? {duration: 2.5, ease: "easeOut", delay: 1} : {}}
                onAnimationComplete={() => isRunning && onLaunchComplete()}
            >
                <div className="relative">
                    <RocketSVG/>
                    {isRunning && (
                        <div className="absolute">
                            <motion.div
                                initial={{scale: 0.5, opacity: 0.5}}
                                animate={{scale: [0.1, 1], opacity: [0.5, 0.8, 1]}}
                                transition={{duration: 2, ease: "easeOut"}}
                                style={{ transformOrigin: "top center" }}
                            >
                                <FlameSVG/>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Show flame only when running */}

            </motion.div>
        </div>
    );
}
