import type { ChangeEvent } from 'react';
import { SIZING_DASHBOARD_FEATURE } from './sizing-dashboard.routes';
import type { SizingDashboardSortKey } from './sizing-dashboard.utils';

export interface SizingDashboardFiltersProps {
  query: string;
  sortKey: SizingDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-sort`}
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
