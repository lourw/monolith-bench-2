import { MediaPanel } from '../../../components/media/panel/media-panel';
import type { CartHistoryItem } from './cart-history.model';
import { CART_HISTORY_FEATURE } from './cart-history.routes';
import {
  formatCartHistoryAmount,
  cartHistoryStatusTone,
} from './cart-history.utils';

export interface CartHistoryTableProps {
  items: ReadonlyArray<CartHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartHistoryTable({
  items,
  selectedId,
  onSelect,
}: CartHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_HISTORY_FEATURE.testId}-empty`}
      >
        No cart history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${CART_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaPanel
                label={item.status}
                tone={cartHistoryStatusTone(item.status)}
                size="sm"
                testId={`${CART_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
