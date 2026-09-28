import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import type { CartDashboardItem } from './cart-dashboard.model';
import { CART_DASHBOARD_FEATURE } from './cart-dashboard.routes';
import {
  formatCartDashboardAmount,
  cartDashboardStatusTone,
} from './cart-dashboard.utils';

export interface CartDashboardTableProps {
  items: ReadonlyArray<CartDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartDashboardTable({
  items,
  selectedId,
  onSelect,
}: CartDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_DASHBOARD_FEATURE.testId}-empty`}
      >
        No cart dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${CART_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyTile
                label={item.status}
                tone={cartDashboardStatusTone(item.status)}
                size="sm"
                testId={`${CART_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
