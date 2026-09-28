import type { ChangeEvent } from 'react';
import { TRACKING_LIST_FEATURE } from './tracking-list.routes';
import type { TrackingListSortKey } from './tracking-list.utils';

export interface TrackingListFiltersProps {
  query: string;
  sortKey: TrackingListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_LIST_FEATURE.testId}-sort`}
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
