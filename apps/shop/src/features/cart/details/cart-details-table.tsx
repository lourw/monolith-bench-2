import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import type { CartDetailsItem } from './cart-details.model';
import { CART_DETAILS_FEATURE } from './cart-details.routes';
import {
  formatCartDetailsAmount,
  cartDetailsStatusTone,
} from './cart-details.utils';

export interface CartDetailsTableProps {
  items: ReadonlyArray<CartDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartDetailsTable({
  items,
  selectedId,
  onSelect,
}: CartDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_DETAILS_FEATURE.testId}-empty`}
      >
        No cart details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${CART_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyToolbar
                label={item.status}
                tone={cartDetailsStatusTone(item.status)}
                size="sm"
                testId={`${CART_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
