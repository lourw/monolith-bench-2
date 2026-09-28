import type { ChangeEvent } from 'react';
import { TRACKING_HISTORY_FEATURE } from './tracking-history.routes';
import type { TrackingHistorySortKey } from './tracking-history.utils';

export interface TrackingHistoryFiltersProps {
  query: string;
  sortKey: TrackingHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_HISTORY_FEATURE.testId}-sort`}
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
