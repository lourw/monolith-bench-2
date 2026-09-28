import { FormsToolbar } from '../../../components/forms/toolbar/forms-toolbar';
import type { OrdersHistoryItem } from './orders-history.model';
import { ORDERS_HISTORY_FEATURE } from './orders-history.routes';
import {
  formatOrdersHistoryAmount,
  ordersHistoryStatusTone,
} from './orders-history.utils';

export interface OrdersHistoryTableProps {
  items: ReadonlyArray<OrdersHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersHistoryTable({
  items,
  selectedId,
  onSelect,
}: OrdersHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_HISTORY_FEATURE.testId}-empty`}
      >
        No orders history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsToolbar
                label={item.status}
                tone={ordersHistoryStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
