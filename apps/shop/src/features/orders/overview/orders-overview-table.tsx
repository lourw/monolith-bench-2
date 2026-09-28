import { MediaBadge } from '../../../components/media/badge/media-badge';
import type { OrdersOverviewItem } from './orders-overview.model';
import { ORDERS_OVERVIEW_FEATURE } from './orders-overview.routes';
import {
  formatOrdersOverviewAmount,
  ordersOverviewStatusTone,
} from './orders-overview.utils';

export interface OrdersOverviewTableProps {
  items: ReadonlyArray<OrdersOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersOverviewTable({
  items,
  selectedId,
  onSelect,
}: OrdersOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No orders overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBadge
                label={item.status}
                tone={ordersOverviewStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
