import type { ChangeEvent } from 'react';
import { ADDRESSES_HISTORY_FEATURE } from './addresses-history.routes';
import type { AddressesHistorySortKey } from './addresses-history.utils';

export interface AddressesHistoryFiltersProps {
  query: string;
  sortKey: AddressesHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-sort`}
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
