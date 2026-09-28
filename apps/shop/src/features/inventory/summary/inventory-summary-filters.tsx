import type { ChangeEvent } from 'react';
import { INVENTORY_SUMMARY_FEATURE } from './inventory-summary.routes';
import type { InventorySummarySortKey } from './inventory-summary.utils';

export interface InventorySummaryFiltersProps {
  query: string;
  sortKey: InventorySummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventorySummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventorySummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventorySummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventorySummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventorySummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-sort`}
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
