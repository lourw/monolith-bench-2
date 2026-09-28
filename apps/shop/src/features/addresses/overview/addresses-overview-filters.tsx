import type { ChangeEvent } from 'react';
import { ADDRESSES_OVERVIEW_FEATURE } from './addresses-overview.routes';
import type { AddressesOverviewSortKey } from './addresses-overview.utils';

export interface AddressesOverviewFiltersProps {
  query: string;
  sortKey: AddressesOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-sort`}
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
