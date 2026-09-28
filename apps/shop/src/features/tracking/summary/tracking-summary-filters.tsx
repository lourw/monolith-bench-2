import type { ChangeEvent } from 'react';
import { TRACKING_SUMMARY_FEATURE } from './tracking-summary.routes';
import type { TrackingSummarySortKey } from './tracking-summary.utils';

export interface TrackingSummaryFiltersProps {
  query: string;
  sortKey: TrackingSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-sort`}
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
