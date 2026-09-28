import type { ChangeEvent } from 'react';
import { RETURNS_LIST_FEATURE } from './returns-list.routes';
import type { ReturnsListSortKey } from './returns-list.utils';

export interface ReturnsListFiltersProps {
  query: string;
  sortKey: ReturnsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_LIST_FEATURE.testId}-sort`}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
