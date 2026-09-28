import type { ChangeEvent } from 'react';
import { CHECKOUT_EDITOR_FEATURE } from './checkout-editor.routes';
import type { CheckoutEditorSortKey } from './checkout-editor.utils';

export interface CheckoutEditorFiltersProps {
  query: string;
  sortKey: CheckoutEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-sort`}
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
