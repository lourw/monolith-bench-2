import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { CheckoutListItem } from './checkout-list.model';
import { CHECKOUT_LIST_FEATURE } from './checkout-list.routes';
import {
  formatCheckoutListAmount,
  checkoutListStatusTone,
} from './checkout-list.utils';

export interface CheckoutListTableProps {
  items: ReadonlyArray<CheckoutListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutListTable({
  items,
  selectedId,
  onSelect,
}: CheckoutListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_LIST_FEATURE.testId}-empty`}
      >
        No checkout list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_LIST_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackTile
                label={item.status}
                tone={checkoutListStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
