import type { ChangeEvent } from 'react';
import { SHIPPING_EDITOR_FEATURE } from './shipping-editor.routes';
import type { ShippingEditorSortKey } from './shipping-editor.utils';

export interface ShippingEditorFiltersProps {
  query: string;
  sortKey: ShippingEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-sort`}
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
