"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import RocketAnimation from "@/components/RocketAnimation";
import LaunchMessage from "@/components/LaunchMessage";
import Header from "@/components/Header";
import SpaceBackground from "@/components/SpaceBackground";
import PasscodePrompt from "@/components/PasscodePrompt"; // Import PasscodePrompt

export default function CodeChallenge() {
    const [isRunning, setIsRunning] = useState(false);
    const [launchComplete, setLaunchComplete] = useState(false);
    const [accessGranted, setAccessGranted] = useState(false);

    const handleLaunchComplete = () => {
        setTimeout(() => {
            setLaunchComplete(true);
        }, 1500);
    };

    const handleRestart = () => {
        setIsRunning(false);
        setLaunchComplete(false);
    };

    return (
        <div className="relative flex flex-col items-center justify-start h-screen bg-gray-900 text-white p-6 overflow-hidden">
            {/* Space Background */}
            <SpaceBackground />

            {/* Show Passcode Prompt First */}
            {!accessGranted ? (
                <PasscodePrompt onAccessGranted={() => setAccessGranted(true)} />
            ) : (
                !launchComplete ? (
                    <>
                        {/* Header */}
                        <Header />
                        <div className="flex w-full px-8 h-full relative">
                            <CodeEditor setIsRunning={setIsRunning} />
                            <RocketAnimation isRunning={isRunning} onLaunchComplete={handleLaunchComplete} />
                        </div>
                    </>
                ) : (
                    <LaunchMessage onRestartAction={handleRestart} />
                )
            )}
        </div>
    );
}
