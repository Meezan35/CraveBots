'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  examples?: string[];
}

export default function SearchInput({ onSearch, examples = [] }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the examples dropdown to close it
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    
    // Also update the input field value directly
    if (inputRef.current) {
      inputRef.current.value = example;
    }
    
    // Execute the search
    onSearch(example);
    
    // Hide examples dropdown
    setShowExamples(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
    setShowExamples(true);
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
            className="w-full py-4 px-6 pl-12 bg-white rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* Search Examples */}
      {showExamples && examples.length > 0 && (
        <div 
          ref={examplesRef}
          className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-3 px-4"
        >
          <p className="text-sm font-medium text-gray-500 mb-2">Try searching for:</p>
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