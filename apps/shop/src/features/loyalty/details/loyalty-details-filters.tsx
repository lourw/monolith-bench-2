import type { ChangeEvent } from 'react';
import { LOYALTY_DETAILS_FEATURE } from './loyalty-details.routes';
import type { LoyaltyDetailsSortKey } from './loyalty-details.utils';

export interface LoyaltyDetailsFiltersProps {
  query: string;
  sortKey: LoyaltyDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-sort`}
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
