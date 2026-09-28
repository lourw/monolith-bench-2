import type { ChangeEvent } from 'react';
import { SIZING_LIST_FEATURE } from './sizing-list.routes';
import type { SizingListSortKey } from './sizing-list.utils';

export interface SizingListFiltersProps {
  query: string;
  sortKey: SizingListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: SizingListSortKey; label: string }> =
  [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'createdAt', label: 'Created' },
  ];

export function SizingListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_LIST_FEATURE.testId}-sort`}
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
