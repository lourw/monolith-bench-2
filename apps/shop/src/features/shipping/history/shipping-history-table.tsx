import { MediaBadge } from '../../../components/media/badge/media-badge';
import type { ShippingHistoryItem } from './shipping-history.model';
import { SHIPPING_HISTORY_FEATURE } from './shipping-history.routes';
import {
  formatShippingHistoryAmount,
  shippingHistoryStatusTone,
} from './shipping-history.utils';

export interface ShippingHistoryTableProps {
  items: ReadonlyArray<ShippingHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingHistoryTable({
  items,
  selectedId,
  onSelect,
}: ShippingHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-empty`}
      >
        No shipping history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBadge
                label={item.status}
                tone={shippingHistoryStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
