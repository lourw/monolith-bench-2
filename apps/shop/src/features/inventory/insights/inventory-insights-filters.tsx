import type { ChangeEvent } from 'react';
import { INVENTORY_INSIGHTS_FEATURE } from './inventory-insights.routes';
import type { InventoryInsightsSortKey } from './inventory-insights.utils';

export interface InventoryInsightsFiltersProps {
  query: string;
  sortKey: InventoryInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventoryInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventoryInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventoryInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventoryInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventoryInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-sort`}
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
