import type { ChangeEvent } from 'react';
import { RETURNS_OVERVIEW_FEATURE } from './returns-overview.routes';
import type { ReturnsOverviewSortKey } from './returns-overview.utils';

export interface ReturnsOverviewFiltersProps {
  query: string;
  sortKey: ReturnsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-sort`}
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
