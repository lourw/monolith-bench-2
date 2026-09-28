import type { ChangeEvent } from 'react';
import { GIFT_CARDS_OVERVIEW_FEATURE } from './gift-cards-overview.routes';
import type { GiftCardsOverviewSortKey } from './gift-cards-overview.utils';

export interface GiftCardsOverviewFiltersProps {
  query: string;
  sortKey: GiftCardsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-sort`}
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
