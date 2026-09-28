import type { ChangeEvent } from 'react';
import { BUNDLES_OVERVIEW_FEATURE } from './bundles-overview.routes';
import type { BundlesOverviewSortKey } from './bundles-overview.utils';

export interface BundlesOverviewFiltersProps {
  query: string;
  sortKey: BundlesOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-sort`}
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
