"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlayIcon, VolumeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatArea({ currentInputs }: { currentInputs: string[] }) {
  const [storyVersions, setStoryVersions] = useState<any[]>([]);
  const [storyStates, setStoryStates] = useState<any[]>([]);

  useEffect(() => {
    if (
      currentInputs.length > 0 &&
      currentInputs.some((input) => input !== "")
    ) {
      const newStoryVersion = generateStoryVersion(currentInputs);
      setStoryVersions((prevVersions) => [...prevVersions, newStoryVersion]);
      setStoryStates((prevStates) => [
        ...prevStates,
        { showAnnotations: false, showAudioPlayer: false, isLoading: false },
      ]);
    }
  }, [currentInputs]);

  const generateStoryVersion = (inputs: string[]) => {
    const nonEmptyInputs = inputs.filter((input) => input !== "");
    const input = nonEmptyInputs.join(", ");
    const text = `In a world where ${nonEmptyInputs[0]} reigned supreme, the ${nonEmptyInputs[1]} found itself in a peculiar situation. As ${nonEmptyInputs[2]} approached, tension filled the air. Suddenly, a ${nonEmptyInputs[3]} appeared, changing everything. The ${nonEmptyInputs[4]} couldn't believe its eyes, and the ${nonEmptyInputs[5]} stood frozen in awe.`;

    const highlights: Record<string, string> = {};
    nonEmptyInputs.forEach((word, index) => {
      highlights[word] = `sound${index + 1}.wav`;
    });

    return { input, text, highlights };
  };

  const renderProse = (versionData: any, index: number) => {
    const { text, highlights } = versionData;
    const parts = text.split(
      new RegExp(`(${Object.keys(highlights).join("|")})`, "g")
    );

    return parts.map((part: string, partIndex: number) => {
      if (highlights[part]) {
        return (
          <span
            key={partIndex}
            className={`inline-block relative ${
              storyStates[index].showAnnotations
                ? "bg-yellow-200 px-2 py-1 rounded"
                : ""
            } text-blue-800`}
          >
            {storyStates[index].isLoading ? (
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold animate-pulse opacity-100">
                ...
              </span>
            ) : storyStates[index].showAnnotations ? (
              <span className="text-xs block opacity-100">
                {highlights[part]}
              </span>
            ) : null}
            <span
              className={
                storyStates[index].isLoading ? "opacity-20" : "opacity-100"
              }
            >
              {part}
            </span>
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

  const toggleAnnotations = (index: number) => {
    setStoryStates((prevStates) => {
      const newStates = [...prevStates];
      if (!newStates[index].showAnnotations) {
        newStates[index].isLoading = true;
        setTimeout(() => {
          setStoryStates((updatedStates) => {
            const finalStates = [...updatedStates];
            finalStates[index].isLoading = false;
            finalStates[index].showAnnotations = true;
            return finalStates;
          });
        }, 1000);
      } else {
        newStates[index].showAnnotations = false;
      }
      return newStates;
    });
  };

  const toggleAudioPlayer = (index: number) => {
    setStoryStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index].showAudioPlayer = !newStates[index].showAudioPlayer;
      return newStates;
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
          {/* Input Area */}
          <div className="bg-blue-100 border border-blue-300 text-gray-700 p-4 rounded-lg text-black w-fit text-right ml-auto">
            {version.input}
          </div>

          {/* Chat Message */}
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <div className="space-y-4">
                <div className="prose">
                  <div>{renderProse(version, index)}</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Button
                    className={`border text-sm ${
                      storyStates[index].showAnnotations
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAnnotations(index)}
                  >
                    {storyStates[index].showAnnotations
                      ? "Hide Sound Files"
                      : "Show Sound Files"}
                  </Button>
                  <Button
                    className={`border text-sm ${
                      storyStates[index].showAudioPlayer
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAudioPlayer(index)}
                  >
                    Generate Audio
                  </Button>
                </div>

                {/* Audio Player */}
                {storyStates[index].showAudioPlayer && (
                  <div className="bg-white border rounded-lg p-2">
                    <div className="flex items-center gap-2 p-2">
                      <Button size="sm" variant="ghost">
                        <PlayIcon className="h-4 w-4" />
                      </Button>
                      <div className="text-xs text-gray-500">0:00 / 0:38</div>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div className="w-0 h-full bg-blue-500 rounded-full" />
                      </div>
                      <Button size="sm" variant="ghost">
                        <VolumeIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
