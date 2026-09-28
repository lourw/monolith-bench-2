import type { ChangeEvent } from 'react';
import { RETURNS_DETAILS_FEATURE } from './returns-details.routes';
import type { ReturnsDetailsSortKey } from './returns-details.utils';

export interface ReturnsDetailsFiltersProps {
  query: string;
  sortKey: ReturnsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_DETAILS_FEATURE.testId}-sort`}
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
