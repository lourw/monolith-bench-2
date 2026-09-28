import { FormsList } from '../../../components/forms/list/forms-list';
import type { WishlistDashboardItem } from './wishlist-dashboard.model';
import { WISHLIST_DASHBOARD_FEATURE } from './wishlist-dashboard.routes';
import {
  formatWishlistDashboardAmount,
  wishlistDashboardStatusTone,
} from './wishlist-dashboard.utils';

export interface WishlistDashboardTableProps {
  items: ReadonlyArray<WishlistDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistDashboardTable({
  items,
  selectedId,
  onSelect,
}: WishlistDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-empty`}
      >
        No wishlist dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsList
                label={item.status}
                tone={wishlistDashboardStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
