import type { ChangeEvent } from 'react';
import { COMPARE_LIST_FEATURE } from './compare-list.routes';
import type { CompareListSortKey } from './compare-list.utils';

export interface CompareListFiltersProps {
  query: string;
  sortKey: CompareListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_LIST_FEATURE.testId}-sort`}
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
