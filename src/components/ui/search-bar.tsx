"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { on } from "events";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  size = "md",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]); // Added onSearch to dependency array to avoid warnings

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`pl-10 pr-10 ${sizeClasses[size]} border-gray-300 focus:border-brand-blue focus:ring-brand-blue`}
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
