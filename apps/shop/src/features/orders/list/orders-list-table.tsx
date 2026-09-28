import { ChartsBadge } from '../../../components/charts/badge/charts-badge';
import type { OrdersListItem } from './orders-list.model';
import { ORDERS_LIST_FEATURE } from './orders-list.routes';
import {
  formatOrdersListAmount,
  ordersListStatusTone,
} from './orders-list.utils';

export interface OrdersListTableProps {
  items: ReadonlyArray<OrdersListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersListTable({
  items,
  selectedId,
  onSelect,
}: OrdersListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_LIST_FEATURE.testId}-empty`}
      >
        No orders list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsBadge
                label={item.status}
                tone={ordersListStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
