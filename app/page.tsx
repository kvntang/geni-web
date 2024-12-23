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
    setCurrentInputs(inputs); // Set data but do not expand the panel
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
          <div className="flex flex-col items-center p-10">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-light text-green-500">Geni</h1>
              <div className="px-1 py-0.5 bg-green-100 text-green-600 text-xs rounded-2xl border border-green-300">
                web
              </div>
            </div>
          </div>
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

        {/* Line */}
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gray-300 z-0"></div>

        {/* Toggle Button */}
        <div className="absolute -left-32 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <span className="text-sm text-gray-200 whitespace-nowrap">
            {isExpanded ? "Hide Panel" : "Show Panel"}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow-sm z-10"
          >
            {isExpanded ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
