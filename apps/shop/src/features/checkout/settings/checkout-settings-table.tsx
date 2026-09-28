import { CoreCard } from '../../../components/core/card/core-card';
import type { CheckoutSettingsItem } from './checkout-settings.model';
import { CHECKOUT_SETTINGS_FEATURE } from './checkout-settings.routes';
import {
  formatCheckoutSettingsAmount,
  checkoutSettingsStatusTone,
} from './checkout-settings.utils';

export interface CheckoutSettingsTableProps {
  items: ReadonlyArray<CheckoutSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutSettingsTable({
  items,
  selectedId,
  onSelect,
}: CheckoutSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-empty`}
      >
        No checkout settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreCard
                label={item.status}
                tone={checkoutSettingsStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
