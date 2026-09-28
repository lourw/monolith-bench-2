import type { ChangeEvent } from 'react';
import { PREORDERS_OVERVIEW_FEATURE } from './preorders-overview.routes';
import type { PreordersOverviewSortKey } from './preorders-overview.utils';

export interface PreordersOverviewFiltersProps {
  query: string;
  sortKey: PreordersOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-sort`}
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
