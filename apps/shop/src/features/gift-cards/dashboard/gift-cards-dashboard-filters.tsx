import type { ChangeEvent } from 'react';
import { GIFT_CARDS_DASHBOARD_FEATURE } from './gift-cards-dashboard.routes';
import type { GiftCardsDashboardSortKey } from './gift-cards-dashboard.utils';

export interface GiftCardsDashboardFiltersProps {
  query: string;
  sortKey: GiftCardsDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-sort`}
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
