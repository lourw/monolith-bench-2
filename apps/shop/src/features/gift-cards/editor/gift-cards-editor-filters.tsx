import type { ChangeEvent } from 'react';
import { GIFT_CARDS_EDITOR_FEATURE } from './gift-cards-editor.routes';
import type { GiftCardsEditorSortKey } from './gift-cards-editor.utils';

export interface GiftCardsEditorFiltersProps {
  query: string;
  sortKey: GiftCardsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-sort`}
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
