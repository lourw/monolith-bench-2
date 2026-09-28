import type { ChangeEvent } from 'react';
import { CART_EDITOR_FEATURE } from './cart-editor.routes';
import type { CartEditorSortKey } from './cart-editor.utils';

export interface CartEditorFiltersProps {
  query: string;
  sortKey: CartEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: CartEditorSortKey; label: string }> =
  [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'createdAt', label: 'Created' },
  ];

export function CartEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_EDITOR_FEATURE.testId}-sort`}
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
