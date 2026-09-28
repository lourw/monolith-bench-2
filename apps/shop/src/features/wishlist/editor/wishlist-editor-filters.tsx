import type { ChangeEvent } from 'react';
import { WISHLIST_EDITOR_FEATURE } from './wishlist-editor.routes';
import type { WishlistEditorSortKey } from './wishlist-editor.utils';

export interface WishlistEditorFiltersProps {
  query: string;
  sortKey: WishlistEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: WishlistEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: WishlistEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function WishlistEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: WishlistEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as WishlistEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter wishlist editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-sort`}
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
