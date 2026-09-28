import { CommerceTile } from '../../../components/commerce/tile/commerce-tile';
import type { OrdersDashboardItem } from './orders-dashboard.model';
import { ORDERS_DASHBOARD_FEATURE } from './orders-dashboard.routes';
import {
  formatOrdersDashboardAmount,
  ordersDashboardStatusTone,
} from './orders-dashboard.utils';

export interface OrdersDashboardTableProps {
  items: ReadonlyArray<OrdersDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersDashboardTable({
  items,
  selectedId,
  onSelect,
}: OrdersDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No orders dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceTile
                label={item.status}
                tone={ordersDashboardStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
