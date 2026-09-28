import type { ChangeEvent } from 'react';
import { COMPARE_DASHBOARD_FEATURE } from './compare-dashboard.routes';
import type { CompareDashboardSortKey } from './compare-dashboard.utils';

export interface CompareDashboardFiltersProps {
  query: string;
  sortKey: CompareDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-sort`}
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
