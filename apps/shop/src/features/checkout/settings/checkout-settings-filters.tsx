import type { ChangeEvent } from 'react';
import { CHECKOUT_SETTINGS_FEATURE } from './checkout-settings.routes';
import type { CheckoutSettingsSortKey } from './checkout-settings.utils';

export interface CheckoutSettingsFiltersProps {
  query: string;
  sortKey: CheckoutSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-sort`}
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
