import type { ChangeEvent } from 'react';
import { ACCOUNT_HISTORY_FEATURE } from './account-history.routes';
import type { AccountHistorySortKey } from './account-history.utils';

export interface AccountHistoryFiltersProps {
  query: string;
  sortKey: AccountHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-sort`}
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
