import type { ChangeEvent } from 'react';
import { SIZING_HISTORY_FEATURE } from './sizing-history.routes';
import type { SizingHistorySortKey } from './sizing-history.utils';

export interface SizingHistoryFiltersProps {
  query: string;
  sortKey: SizingHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_HISTORY_FEATURE.testId}-sort`}
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
