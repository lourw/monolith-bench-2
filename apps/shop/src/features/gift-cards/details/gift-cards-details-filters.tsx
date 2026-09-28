import type { ChangeEvent } from 'react';
import { GIFT_CARDS_DETAILS_FEATURE } from './gift-cards-details.routes';
import type { GiftCardsDetailsSortKey } from './gift-cards-details.utils';

export interface GiftCardsDetailsFiltersProps {
  query: string;
  sortKey: GiftCardsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-sort`}
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
