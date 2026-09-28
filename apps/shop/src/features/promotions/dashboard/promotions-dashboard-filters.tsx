import type { ChangeEvent } from 'react';
import { PROMOTIONS_DASHBOARD_FEATURE } from './promotions-dashboard.routes';
import type { PromotionsDashboardSortKey } from './promotions-dashboard.utils';

export interface PromotionsDashboardFiltersProps {
  query: string;
  sortKey: PromotionsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-sort`}
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
