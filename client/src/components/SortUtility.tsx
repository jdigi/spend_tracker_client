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
    <div className="sort-wrap">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={sortKey} onChange={handleKeyChange}>
        {sortOptions.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};
