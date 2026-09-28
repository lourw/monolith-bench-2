import type { ChangeEvent } from 'react';
import { TRACKING_OVERVIEW_FEATURE } from './tracking-overview.routes';
import type { TrackingOverviewSortKey } from './tracking-overview.utils';

export interface TrackingOverviewFiltersProps {
  query: string;
  sortKey: TrackingOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-sort`}
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
