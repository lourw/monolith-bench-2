import { FeedbackToolbar } from '../../../components/feedback/toolbar/feedback-toolbar';
import type { CartOverviewItem } from './cart-overview.model';
import { CART_OVERVIEW_FEATURE } from './cart-overview.routes';
import {
  formatCartOverviewAmount,
  cartOverviewStatusTone,
} from './cart-overview.utils';

export interface CartOverviewTableProps {
  items: ReadonlyArray<CartOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartOverviewTable({
  items,
  selectedId,
  onSelect,
}: CartOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_OVERVIEW_FEATURE.testId}-empty`}
      >
        No cart overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${CART_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackToolbar
                label={item.status}
                tone={cartOverviewStatusTone(item.status)}
                size="sm"
                testId={`${CART_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
