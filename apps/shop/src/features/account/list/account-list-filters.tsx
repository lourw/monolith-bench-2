import type { ChangeEvent } from 'react';
import { ACCOUNT_LIST_FEATURE } from './account-list.routes';
import type { AccountListSortKey } from './account-list.utils';

export interface AccountListFiltersProps {
  query: string;
  sortKey: AccountListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_LIST_FEATURE.testId}-sort`}
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
