import { MediaBanner } from '../../../components/media/banner/media-banner';
import type { OrdersDetailsItem } from './orders-details.model';
import { ORDERS_DETAILS_FEATURE } from './orders-details.routes';
import {
  formatOrdersDetailsAmount,
  ordersDetailsStatusTone,
} from './orders-details.utils';

export interface OrdersDetailsTableProps {
  items: ReadonlyArray<OrdersDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersDetailsTable({
  items,
  selectedId,
  onSelect,
}: OrdersDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_DETAILS_FEATURE.testId}-empty`}
      >
        No orders details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBanner
                label={item.status}
                tone={ordersDetailsStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
