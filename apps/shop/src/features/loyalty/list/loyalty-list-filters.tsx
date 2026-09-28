import type { ChangeEvent } from 'react';
import { LOYALTY_LIST_FEATURE } from './loyalty-list.routes';
import type { LoyaltyListSortKey } from './loyalty-list.utils';

export interface LoyaltyListFiltersProps {
  query: string;
  sortKey: LoyaltyListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_LIST_FEATURE.testId}-sort`}
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
