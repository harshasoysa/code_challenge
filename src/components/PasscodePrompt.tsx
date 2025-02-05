"use client";

import { useState } from "react";

interface PasscodePromptProps {
    onAccessGranted: () => void;
}

export default function PasscodePrompt({ onAccessGranted }: PasscodePromptProps) {
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (passcode === "3141592") {
            onAccessGranted(); // Grant access
        } else {
            setError("Incorrect passcode. Try again!");
            setPasscode(""); // Clear input
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white text-center">
                <h2 className="text-xl font-bold mb-4">Enter Passcode</h2>
                <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center gap-4">
                    <input
                        type="password"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="px-4 py-2 rounded-lg w-[300px] bg-gray-700 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        placeholder="Enter passcode"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex-grow-0 "
                    >
                        Submit
                    </button>
                </form>
                {error && <p className="text-red-400 mt-2">{error}</p>}
            </div>
        </div>
    );
}
