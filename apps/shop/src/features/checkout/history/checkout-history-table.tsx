import { CommerceBanner } from '../../../components/commerce/banner/commerce-banner';
import type { CheckoutHistoryItem } from './checkout-history.model';
import { CHECKOUT_HISTORY_FEATURE } from './checkout-history.routes';
import {
  formatCheckoutHistoryAmount,
  checkoutHistoryStatusTone,
} from './checkout-history.utils';

export interface CheckoutHistoryTableProps {
  items: ReadonlyArray<CheckoutHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutHistoryTable({
  items,
  selectedId,
  onSelect,
}: CheckoutHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-empty`}
      >
        No checkout history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceBanner
                label={item.status}
                tone={checkoutHistoryStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
