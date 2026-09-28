import type { ChangeEvent } from 'react';
import { COMPARE_OVERVIEW_FEATURE } from './compare-overview.routes';
import type { CompareOverviewSortKey } from './compare-overview.utils';

export interface CompareOverviewFiltersProps {
  query: string;
  sortKey: CompareOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-sort`}
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
