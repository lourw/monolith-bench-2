import { DataHeader } from '../../../components/data/header/data-header';
import type { CartListItem } from './cart-list.model';
import { CART_LIST_FEATURE } from './cart-list.routes';
import { formatCartListAmount, cartListStatusTone } from './cart-list.utils';

export interface CartListTableProps {
  items: ReadonlyArray<CartListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartListTable({
  items,
  selectedId,
  onSelect,
}: CartListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_LIST_FEATURE.testId}-empty`}
      >
        No cart list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_LIST_FEATURE.testId}-table`}
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
            data-testid={`${CART_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataHeader
                label={item.status}
                tone={cartListStatusTone(item.status)}
                size="sm"
                testId={`${CART_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
