const FilterDropdown = ({ label }: { label: string }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:bg-accent transition-colors">
    <span>{label}</span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

export const FilterBar = () => {
  return (
    <div className="flex items-center gap-3 py-4">
      <FilterDropdown label="Type" />
      <FilterDropdown label="People" />
      <FilterDropdown label="Modified" />
      <FilterDropdown label="Location" />
    </div>
  );
};