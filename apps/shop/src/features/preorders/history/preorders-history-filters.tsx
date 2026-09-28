import type { ChangeEvent } from 'react';
import { PREORDERS_HISTORY_FEATURE } from './preorders-history.routes';
import type { PreordersHistorySortKey } from './preorders-history.utils';

export interface PreordersHistoryFiltersProps {
  query: string;
  sortKey: PreordersHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-sort`}
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
