import type { ChangeEvent } from 'react';
import { ADDRESSES_LIST_FEATURE } from './addresses-list.routes';
import type { AddressesListSortKey } from './addresses-list.utils';

export interface AddressesListFiltersProps {
  query: string;
  sortKey: AddressesListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_LIST_FEATURE.testId}-sort`}
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
