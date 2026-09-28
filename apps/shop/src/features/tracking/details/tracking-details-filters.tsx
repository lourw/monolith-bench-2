import type { ChangeEvent } from 'react';
import { TRACKING_DETAILS_FEATURE } from './tracking-details.routes';
import type { TrackingDetailsSortKey } from './tracking-details.utils';

export interface TrackingDetailsFiltersProps {
  query: string;
  sortKey: TrackingDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_DETAILS_FEATURE.testId}-sort`}
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
