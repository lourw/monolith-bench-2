import type { ChangeEvent } from 'react';
import { COMPARE_DETAILS_FEATURE } from './compare-details.routes';
import type { CompareDetailsSortKey } from './compare-details.utils';

export interface CompareDetailsFiltersProps {
  query: string;
  sortKey: CompareDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_DETAILS_FEATURE.testId}-sort`}
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
