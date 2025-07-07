import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute  left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search in Opndrive"
        className="w-full rounded-full border border-transparent bg-input py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-transparent"
      />
    </div>
  );
};