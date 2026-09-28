import type { ChangeEvent } from 'react';
import { SUPPORT_LIST_FEATURE } from './support-list.routes';
import type { SupportListSortKey } from './support-list.utils';

export interface SupportListFiltersProps {
  query: string;
  sortKey: SupportListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_LIST_FEATURE.testId}-sort`}
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
