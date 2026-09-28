import type { ChangeEvent } from 'react';
import { PREORDERS_LIST_FEATURE } from './preorders-list.routes';
import type { PreordersListSortKey } from './preorders-list.utils';

export interface PreordersListFiltersProps {
  query: string;
  sortKey: PreordersListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_LIST_FEATURE.testId}-sort`}
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
