import { DataBanner } from '../../../components/data/banner/data-banner';
import type { OrdersInsightsItem } from './orders-insights.model';
import { ORDERS_INSIGHTS_FEATURE } from './orders-insights.routes';
import {
  formatOrdersInsightsAmount,
  ordersInsightsStatusTone,
} from './orders-insights.utils';

export interface OrdersInsightsTableProps {
  items: ReadonlyArray<OrdersInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersInsightsTable({
  items,
  selectedId,
  onSelect,
}: OrdersInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No orders insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataBanner
                label={item.status}
                tone={ordersInsightsStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
