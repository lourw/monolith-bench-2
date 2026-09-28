import type { ChangeEvent } from 'react';
import { SHIPPING_SETTINGS_FEATURE } from './shipping-settings.routes';
import type { ShippingSettingsSortKey } from './shipping-settings.utils';

export interface ShippingSettingsFiltersProps {
  query: string;
  sortKey: ShippingSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ShippingSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ShippingSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ShippingSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ShippingSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ShippingSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter shipping settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-sort`}
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
