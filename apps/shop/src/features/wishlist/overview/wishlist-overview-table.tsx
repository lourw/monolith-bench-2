import { FeedbackBadge } from '../../../components/feedback/badge/feedback-badge';
import type { WishlistOverviewItem } from './wishlist-overview.model';
import { WISHLIST_OVERVIEW_FEATURE } from './wishlist-overview.routes';
import {
  formatWishlistOverviewAmount,
  wishlistOverviewStatusTone,
} from './wishlist-overview.utils';

export interface WishlistOverviewTableProps {
  items: ReadonlyArray<WishlistOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistOverviewTable({
  items,
  selectedId,
  onSelect,
}: WishlistOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-empty`}
      >
        No wishlist overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackBadge
                label={item.status}
                tone={wishlistOverviewStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
