'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  withAdvanced?: boolean;
  onAdvancedClick?: () => void;
}

export const SearchBar = ({ withAdvanced = false, onAdvancedClick }: SearchBarProps) => (
  <div className="relative w-full">
    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
    <input
      type="text"
      placeholder="Search in Opndrive"
      className={`w-full rounded-full border border-transparent bg-input py-3 pl-12 ${
        withAdvanced ? 'pr-12' : 'pr-4'
      } text-foreground focus:outline-none focus:border-transparent`}
    />
    {withAdvanced && (
      <button
        type="button"
        onClick={onAdvancedClick}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        aria-label="Advanced search"
      >
        <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
      </button>
    )}
  </div>
);
