"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordGrid } from "./components/word-grid";
import { ChatArea } from "./components/chat-area";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentInputs, setCurrentInputs] = useState<string[]>([]);

  const handlePlay = (inputs: string[]) => {
    setCurrentInputs(inputs);
    setIsExpanded(true);
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Main Content - WordGrid */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isExpanded ? "w-1/2" : "w-full"
        )}
      >
        <div className="p-8 overflow-auto text-center">
          <h1 className="text-4xl font-light text-blue-300 mb-8">Geni</h1>
          <WordGrid onPlay={handlePlay} />
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={cn(
          "relative flex-shrink-0 transition-all duration-300 ease-in-out",
          isExpanded ? "w-1/2" : "w-0"
        )}
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-full h-full overflow-y-auto transition-transform duration-300 ease-in-out bg-gray-50",
            isExpanded ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-8">
            <ChatArea currentInputs={currentInputs} />
          </div>
        </div>

        {/* Toggle Button */}
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gray-300 z-0"></div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow-sm z-10"
        >
          {isExpanded ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </div>
  );
}
