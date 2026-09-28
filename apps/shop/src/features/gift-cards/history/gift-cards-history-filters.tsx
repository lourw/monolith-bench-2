import type { ChangeEvent } from 'react';
import { GIFT_CARDS_HISTORY_FEATURE } from './gift-cards-history.routes';
import type { GiftCardsHistorySortKey } from './gift-cards-history.utils';

export interface GiftCardsHistoryFiltersProps {
  query: string;
  sortKey: GiftCardsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-sort`}
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
