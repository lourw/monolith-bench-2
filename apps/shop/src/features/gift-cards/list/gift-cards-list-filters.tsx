import type { ChangeEvent } from 'react';
import { GIFT_CARDS_LIST_FEATURE } from './gift-cards-list.routes';
import type { GiftCardsListSortKey } from './gift-cards-list.utils';

export interface GiftCardsListFiltersProps {
  query: string;
  sortKey: GiftCardsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-sort`}
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
