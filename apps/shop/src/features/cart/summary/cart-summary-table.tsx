import { MediaPanel } from '../../../components/media/panel/media-panel';
import type { CartSummaryItem } from './cart-summary.model';
import { CART_SUMMARY_FEATURE } from './cart-summary.routes';
import {
  formatCartSummaryAmount,
  cartSummaryStatusTone,
} from './cart-summary.utils';

export interface CartSummaryTableProps {
  items: ReadonlyArray<CartSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartSummaryTable({
  items,
  selectedId,
  onSelect,
}: CartSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_SUMMARY_FEATURE.testId}-empty`}
      >
        No cart summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${CART_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaPanel
                label={item.status}
                tone={cartSummaryStatusTone(item.status)}
                size="sm"
                testId={`${CART_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
