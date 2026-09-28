import type { ChangeEvent } from 'react';
import { SIZING_OVERVIEW_FEATURE } from './sizing-overview.routes';
import type { SizingOverviewSortKey } from './sizing-overview.utils';

export interface SizingOverviewFiltersProps {
  query: string;
  sortKey: SizingOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-sort`}
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
