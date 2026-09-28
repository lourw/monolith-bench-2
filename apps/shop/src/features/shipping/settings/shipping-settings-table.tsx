import { OverlayChip } from '../../../components/overlay/chip/overlay-chip';
import type { ShippingSettingsItem } from './shipping-settings.model';
import { SHIPPING_SETTINGS_FEATURE } from './shipping-settings.routes';
import {
  formatShippingSettingsAmount,
  shippingSettingsStatusTone,
} from './shipping-settings.utils';

export interface ShippingSettingsTableProps {
  items: ReadonlyArray<ShippingSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingSettingsTable({
  items,
  selectedId,
  onSelect,
}: ShippingSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-empty`}
      >
        No shipping settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayChip
                label={item.status}
                tone={shippingSettingsStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
