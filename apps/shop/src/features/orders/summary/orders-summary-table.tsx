import { CommerceCard } from '../../../components/commerce/card/commerce-card';
import type { OrdersSummaryItem } from './orders-summary.model';
import { ORDERS_SUMMARY_FEATURE } from './orders-summary.routes';
import {
  formatOrdersSummaryAmount,
  ordersSummaryStatusTone,
} from './orders-summary.utils';

export interface OrdersSummaryTableProps {
  items: ReadonlyArray<OrdersSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersSummaryTable({
  items,
  selectedId,
  onSelect,
}: OrdersSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-empty`}
      >
        No orders summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceCard
                label={item.status}
                tone={ordersSummaryStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
