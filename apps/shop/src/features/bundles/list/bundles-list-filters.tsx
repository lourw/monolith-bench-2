import type { ChangeEvent } from 'react';
import { BUNDLES_LIST_FEATURE } from './bundles-list.routes';
import type { BundlesListSortKey } from './bundles-list.utils';

export interface BundlesListFiltersProps {
  query: string;
  sortKey: BundlesListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_LIST_FEATURE.testId}-sort`}
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
