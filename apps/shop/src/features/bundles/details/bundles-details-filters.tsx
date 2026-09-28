import type { ChangeEvent } from 'react';
import { BUNDLES_DETAILS_FEATURE } from './bundles-details.routes';
import type { BundlesDetailsSortKey } from './bundles-details.utils';

export interface BundlesDetailsFiltersProps {
  query: string;
  sortKey: BundlesDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-sort`}
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
