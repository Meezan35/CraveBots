"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Mic } from "lucide-react";

// Proper Web Speech API type declarations
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onresult:
      | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
      | null;
    onerror:
      | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
      | null;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    readonly isFinal: boolean;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }
}

interface SearchInputProps {
  onSearch: (query: string) => void;
  examples?: string[];
  searchResults?: string; // Optional prop to announce search results
  isSearching?: boolean; // Optional prop to indicate search is in progress
}

export default function SearchInput({
  onSearch,
  examples = [],
  searchResults,
  isSearching,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);

  // Type for SpeechRecognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // State to store mic errors
  const [micError, setMicError] = useState<string | null>(null);

  // Speech Synthesis state and ref
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Function to speak text
  const speak = (
    text: string,
    options: { rate?: number; pitch?: number; volume?: number } = {}
  ) => {
    if (!synthRef.current) {
      console.warn("Speech Synthesis not supported");
      return;
    }

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  // Effect to announce search results
  useEffect(() => {
    if (searchResults && !isSearching) {
      // Announce the search results after a short delay
      const timer = setTimeout(() => {
        speak(`Found results: ${searchResults}`, { rate: 1.1 });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchResults, isSearching]);

  useEffect(() => {
    if (isSearching) {
      speak("Searching...", { rate: 1.2 });
    }
  }, [isSearching]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        examplesRef.current &&
        !examplesRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowExamples(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      console.warn("Speech Recognition API is not supported in this browser.");
      setMicError("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setMicError(null);
      console.log("Speech recognition started. Please speak...");

      // Audio feedback when recording starts
      speak("Listening...", { rate: 1.3, pitch: 1.1 });
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log("User said:", transcript);
      setQuery(transcript);

      // Confirm what was heard with audio feedback
      speak(`Searching for ${transcript}`, { rate: 1.1 });

      // Automatically trigger search after speech recognition
      if (transcript.trim()) {
        onSearch(transcript.trim());
        setShowExamples(false);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Speech recognition ended.");
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      console.error("Speech recognition error:", event.error);
      setMicError(`Mic Error: ${event.error}`);

      // Audio feedback for errors
      if (event.error === "not-allowed") {
        speak(
          "Microphone access denied. Please allow microphone access in your browser settings."
        );
      } else if (event.error === "no-speech") {
        speak("No speech detected. Please try again.");
      } else {
        speak("Speech recognition error occurred.");
      }
    };

    recognitionRef.current = recognition;

    // Cleanup on component unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowExamples(false);
    }
  };

  const handleExampleClick = (example: string) => {
    // Set the query in state
    setQuery(example);

    if (inputRef.current) {
      inputRef.current.value = example;
    }

    onSearch(example);

    setShowExamples(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
    setShowExamples(true);
  };

  // Function to handle mic button click
  const handleMicClick = () => {
    if (micError) {
      speak(micError);
      return;
    }

    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        speak("Voice search stopped.", { rate: 1.2 });
      } else {
        recognitionRef.current.start();
      }
    }
  };

  // Function to stop speech synthesis
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Check if speech recognition is available
  const isSpeechRecognitionAvailable = () => {
    if (typeof window === "undefined") return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Describe what you're craving..."
            className="w-full py-4 px-6 pl-12 bg-white rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 pr-32"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>

          {/* Microphone Button - Only show if API is supported */}
          {isSpeechRecognitionAvailable() && (
            <div className="absolute right-24 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={handleMicClick}
                className={`flex items-center justify-center p-2 rounded-full transition-colors
                            ${
                              isListening
                                ? "text-indigo-500 bg-indigo-50"
                                : "text-gray-500 hover:bg-gray-100"
                            }
                            ${micError ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!!micError}
                aria-label="Voice search"
                title={micError || "Voice search"}
              >
                <Mic
                  className={`h-6 w-6 ${isListening ? "animate-pulse" : ""}`}
                />
              </button>

              {/* Stop speaking button - only show when speaking */}
              {isSpeaking && (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="flex items-center justify-center p-1 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Stop speaking"
                  title="Stop speaking"
                >
                  <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Optional: Display mic error message */}
      {micError && (
        <p className="text-red-500 text-sm mt-2 text-center">{micError}</p>
      )}

      {/* Search Examples */}
      {showExamples && examples.length > 0 && (
        <div
          ref={examplesRef}
          className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-3 px-4"
        >
          <p className="text-sm font-medium text-gray-500 mb-2">
            Try searching for:
          </p>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg text-sm transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
