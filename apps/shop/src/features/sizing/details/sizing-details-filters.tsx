import type { ChangeEvent } from 'react';
import { SIZING_DETAILS_FEATURE } from './sizing-details.routes';
import type { SizingDetailsSortKey } from './sizing-details.utils';

export interface SizingDetailsFiltersProps {
  query: string;
  sortKey: SizingDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_DETAILS_FEATURE.testId}-sort`}
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
