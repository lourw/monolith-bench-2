import type { ChangeEvent } from 'react';
import { ORDERS_EDITOR_FEATURE } from './orders-editor.routes';
import type { OrdersEditorSortKey } from './orders-editor.utils';

export interface OrdersEditorFiltersProps {
  query: string;
  sortKey: OrdersEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_EDITOR_FEATURE.testId}-sort`}
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
