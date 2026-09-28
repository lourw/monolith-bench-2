import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import type { OrdersSettingsItem } from './orders-settings.model';
import { ORDERS_SETTINGS_FEATURE } from './orders-settings.routes';
import {
  formatOrdersSettingsAmount,
  ordersSettingsStatusTone,
} from './orders-settings.utils';

export interface OrdersSettingsTableProps {
  items: ReadonlyArray<OrdersSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersSettingsTable({
  items,
  selectedId,
  onSelect,
}: OrdersSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-empty`}
      >
        No orders settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackHeader
                label={item.status}
                tone={ordersSettingsStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
