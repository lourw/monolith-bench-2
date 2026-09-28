import { MediaHeader } from '../../../components/media/header/media-header';
import type { WishlistListItem } from './wishlist-list.model';
import { WISHLIST_LIST_FEATURE } from './wishlist-list.routes';
import {
  formatWishlistListAmount,
  wishlistListStatusTone,
} from './wishlist-list.utils';

export interface WishlistListTableProps {
  items: ReadonlyArray<WishlistListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistListTable({
  items,
  selectedId,
  onSelect,
}: WishlistListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_LIST_FEATURE.testId}-empty`}
      >
        No wishlist list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_LIST_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaHeader
                label={item.status}
                tone={wishlistListStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
