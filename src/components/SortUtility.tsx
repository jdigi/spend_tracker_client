import { useState } from "react";

interface SortUtilityProps {
  sortOptions: any;
  handleSort: (sortKey: string, sortOrder: string) => void;
}

export const SortUtility = ({ sortOptions, handleSort }: SortUtilityProps) => {
  const [sortKey, setSortKey] = useState("company");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
    handleSort(e.target.value, sortOrder);
  };

  return (
    <div className="sort-wrap rounded-md border border-black p-2 self-start mr-3 mt-5">
      <label htmlFor="sort" className="text-sm">
        Sort by:
      </label>
      <select
        id="sort"
        className="text-sm"
        value={sortKey}
        onChange={handleKeyChange}
      >
        {sortOptions.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        className="text-sm"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};
