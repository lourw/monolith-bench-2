import { OverlayToolbar } from '../../../components/overlay/toolbar/overlay-toolbar';
import type { CartSettingsItem } from './cart-settings.model';
import { CART_SETTINGS_FEATURE } from './cart-settings.routes';
import {
  formatCartSettingsAmount,
  cartSettingsStatusTone,
} from './cart-settings.utils';

export interface CartSettingsTableProps {
  items: ReadonlyArray<CartSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartSettingsTable({
  items,
  selectedId,
  onSelect,
}: CartSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_SETTINGS_FEATURE.testId}-empty`}
      >
        No cart settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${CART_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayToolbar
                label={item.status}
                tone={cartSettingsStatusTone(item.status)}
                size="sm"
                testId={`${CART_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
