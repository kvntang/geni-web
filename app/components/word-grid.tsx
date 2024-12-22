"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";

export function WordGrid({ onPlay }: { onPlay: (inputs: string[]) => void }) {
  const inputRefs = useRef(Array(6).fill(null));
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPlayedInputs, setLastPlayedInputs] = useState<string[]>([]);

  const handleChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const handlePlayButtonClick = () => {
    console.log("Current Inputs:", inputs);
    onPlay(inputs);
    setLastPlayedInputs([...inputs]);
    setInputs(Array(6).fill(""));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowAudioPlayer(true);
    }, 4000);
  };

  const clearInputs = () => {
    setInputs(Array(6).fill(""));
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div>
        <div className="grid grid-cols-3 gap-6">
          {inputs.map((input, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={input}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`${index + 1}`}
              className={cn(
                "h-24 w-24 text-lg text-center rounded-md focus:outline-none border-2",
                input === ""
                  ? "bg-gray-200 border-gray-300"
                  : "bg-blue-100 hover:bg-blue-200 border-blue-300 text-gray-700"
              )}
            />
          ))}
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="flex gap-2">
            <button
              className="w-32 h-12 rounded-full bg-blue-100 hover:bg-blue-200 text-gray-700 flex items-center justify-center"
              onClick={handlePlayButtonClick}
            >
              <PlayIcon className="mr-2 h-4 w-4" />
              Play
            </button>
            <button
              className="px-4 h-12 rounded-full bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center text-sm"
              onClick={clearInputs}
            >
              Clear
            </button>
          </div>
        </div>

        {(isLoading || showAudioPlayer) && (
          <div className="bg-white border rounded-lg p-2 mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-12 text-gray-500 text-sm">
                Loading<span className="animate-pulse">...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 p-2">
                  <button className="p-1">
                    <PlayIcon className="h-4 w-4" />
                  </button>
                  <div className="text-xs text-gray-500">0:00 / 0:38</div>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div className="w-0 h-full bg-blue-500 rounded-full" />
                  </div>
                  <button className="p-1">
                    <PlayIcon className="h-4 w-4" />
                  </button>
                </div>
                {lastPlayedInputs.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    Inputs:{" "}
                    {lastPlayedInputs
                      .filter((input) => input !== "")
                      .join(", ")}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}