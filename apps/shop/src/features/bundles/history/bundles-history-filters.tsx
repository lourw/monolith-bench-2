import type { ChangeEvent } from 'react';
import { BUNDLES_HISTORY_FEATURE } from './bundles-history.routes';
import type { BundlesHistorySortKey } from './bundles-history.utils';

export interface BundlesHistoryFiltersProps {
  query: string;
  sortKey: BundlesHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-sort`}
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
