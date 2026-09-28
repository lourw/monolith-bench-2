import type { ChangeEvent } from 'react';
import { LOYALTY_HISTORY_FEATURE } from './loyalty-history.routes';
import type { LoyaltyHistorySortKey } from './loyalty-history.utils';

export interface LoyaltyHistoryFiltersProps {
  query: string;
  sortKey: LoyaltyHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-sort`}
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
