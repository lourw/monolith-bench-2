import { FormsPanel } from '../../../components/forms/panel/forms-panel';
import type { WishlistDetailsItem } from './wishlist-details.model';
import { WISHLIST_DETAILS_FEATURE } from './wishlist-details.routes';
import {
  formatWishlistDetailsAmount,
  wishlistDetailsStatusTone,
} from './wishlist-details.utils';

export interface WishlistDetailsTableProps {
  items: ReadonlyArray<WishlistDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistDetailsTable({
  items,
  selectedId,
  onSelect,
}: WishlistDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-empty`}
      >
        No wishlist details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsPanel
                label={item.status}
                tone={wishlistDetailsStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
