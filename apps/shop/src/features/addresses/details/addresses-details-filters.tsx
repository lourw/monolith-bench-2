import type { ChangeEvent } from 'react';
import { ADDRESSES_DETAILS_FEATURE } from './addresses-details.routes';
import type { AddressesDetailsSortKey } from './addresses-details.utils';

export interface AddressesDetailsFiltersProps {
  query: string;
  sortKey: AddressesDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-sort`}
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
