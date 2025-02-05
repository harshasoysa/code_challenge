"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

interface CodeEditorProps {
    setIsRunning: (value: boolean) => void;
}

export default function CodeEditor({ setIsRunning }: CodeEditorProps) {
    const [code, setCode] = useState(`Rocket.launch();`);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

    const handleReset = () => {
        setCode(`Rocket.launch();`);
        setIsRunning(false);
        setConsoleOutput([]);
    };

    const handleRun = () => {
        try {
            setConsoleOutput([]);
            setIsRunning(false);

            let outputLogs: string[] = [];
            let errorHint: string | null = null;
            let showCommandHint = false;

            const customConsole = {
                log: (msg: string) => outputLogs.push(`📝 ${msg}`),
            };

            const Rocket = {
                fuelLevel: 0,
                engineReady: false,
                hatchClosed: false,
                countdownStarted: false,

                fillFuel(amount: number) {
                    this.fuelLevel = amount;
                    customConsole.log(`🛢️  Fuel filled to ${this.fuelLevel}%.`);
                },

                checkEngineStatus() {
                    if (this.fuelLevel >= 50) {
                        this.engineReady = true;
                        customConsole.log("✅ Engine is ready.");
                    } else {
                        errorHint = `🚨 Fuel is too low!${showCommandHint ? " Use `Rocket.fillFuel(50);`" : ""}`;
                    }
                },

                closeHatch() {
                    this.hatchClosed = true;
                    customConsole.log("🔒 Hatch closed.");
                },

                startCountdown() {
                    if (!this.engineReady) {
                        errorHint = "🚨 The engine is not ready! Use `Rocket.checkEngineStatus();`";
                    } else if (!this.hatchClosed) {
                        errorHint = "🚨 Hatch is still open! Use `Rocket.closeHatch();`";
                    } else {
                        this.countdownStarted = true;
                        customConsole.log("⏱️  Countdown started: T-minus 3, 2, 1...");
                    }
                },

                launch() {
                    if (this.fuelLevel < 50) {
                        errorHint = `🚨 Fuel is too low!${showCommandHint ? " Use `Rocket.fillFuel(50);`" : ""}`;
                    } else if (!this.engineReady) {
                        errorHint = "🚨 The engine is not ready! Use `Rocket.checkEngineStatus();`";
                    } else if (!this.hatchClosed) {
                        errorHint = "🚨 Hatch is still open! Use `Rocket.closeHatch();`";
                    } else if (!this.countdownStarted) {
                        errorHint = "🚨 Countdown hasn’t started! Use `Rocket.startCountdown();`";
                    } else {
                        customConsole.log("🚀 Rocket has launched successfully!");
                        setIsRunning(true);
                    }
                },
            };

            eval(code);

            if (errorHint) outputLogs.push(errorHint);

            setConsoleOutput(outputLogs);
        } catch (error) {
            setConsoleOutput(["🚨 Syntax error! Check your function calls."]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-5 z-30 ">
            <div className="w-[500px] bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden">
                <div className="h-[250px] border-b border-gray-600">
                    <CodeMirror
                        value={code}
                        extensions={[javascript()]}
                        onChange={setCode}
                        theme="dark"
                        className="h-full"
                    />
                </div>

                <div className="h-[150px] bg-black p-2 text-green-400 text-sm font-mono overflow-y-auto">
                    {consoleOutput.length > 0 ? (
                        consoleOutput.map((line, index) => <div key={index}>{line}</div>)
                    ) : (
                        <span className="text-gray-500">Console output will appear here...</span>
                    )}
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
                    onClick={handleRun}
                >
                    Run
                </button>
            </div>
        </div>
    );
}
