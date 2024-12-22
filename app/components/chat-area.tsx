"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlayIcon, VolumeIcon } from "lucide-react";

// Define types for storyVersions and storyStates
type StoryVersion = {
  input: string;
  text: string;
  highlights: Record<string, string>;
};

export function ChatArea({ currentInputs }: { currentInputs: string[] }) {
  const [storyVersions, setStoryVersions] = useState<StoryVersion[]>([]);

  useEffect(() => {
    if (
      currentInputs.length > 0 &&
      currentInputs.some((input) => input !== "")
    ) {
      const newStoryVersion = generateStoryVersion(currentInputs);
      setStoryVersions((prevVersions) => [...prevVersions, newStoryVersion]);
    }
  }, [currentInputs]);

  const generateStoryVersion = (inputs: string[]): StoryVersion => {
    const nonEmptyInputs = inputs.filter((input) => input !== "");
    const input = nonEmptyInputs.join(", ");
    const text = `In a world where ${nonEmptyInputs[0]} reigned supreme, the ${nonEmptyInputs[1]} found itself in a peculiar situation. As ${nonEmptyInputs[2]} approached, tension filled the air. Suddenly, a ${nonEmptyInputs[3]} appeared, changing everything. The ${nonEmptyInputs[4]} couldn't believe its eyes, and the ${nonEmptyInputs[5]} stood frozen in awe.`;

    const highlights: Record<string, string> = {};
    nonEmptyInputs.forEach((word, index) => {
      highlights[word] = `sound${index + 1}.wav`;
    });

    return { input, text, highlights };
  };

  const renderProse = (versionData: StoryVersion) => {
    const { text, highlights } = versionData;
    const parts = text.split(
      new RegExp(`(${Object.keys(highlights).join("|")})`, "g")
    );

    return parts.map((part: string, partIndex: number) => {
      if (highlights[part]) {
        return (
          <span
            key={partIndex}
            className="inline-block relative bg-yellow-200 px-2 py-1 rounded text-blue-800"
          >
            <span className="text-[10px] block opacity-100">
              {highlights[part]}
            </span>
            <span>{part}</span>
          </span>
        );
      }
      return (
        <span key={partIndex} className="text-gray-500">
          {part}
        </span>
      );
    });
  };

  if (storyVersions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-200 text-lg">No chat yet, enter something</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {storyVersions.map((version, index) => (
        <div key={index}>
          <div className="bg-blue-100 border border-blue-300 text-gray-700 p-4 rounded-lg text-black w-fit text-right ml-auto">
            {version.input}
          </div>
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <div className="space-y-4">
                <div className="prose">
                  <div>{renderProse(version)}</div>
                </div>
                <div className="bg-white border rounded-lg p-2">
                  <div className="flex items-center gap-2 p-2">
                    <button className="text-sm text-gray-500">
                      <PlayIcon className="h-4 w-4" />
                    </button>
                    <div className="text-xs text-gray-500">0:00 / 0:38</div>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                      <div className="w-0 h-full bg-blue-500 rounded-full" />
                    </div>
                    <button className="text-sm text-gray-500">
                      <VolumeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
