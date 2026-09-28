import { MediaTile } from '../../../components/media/tile/media-tile';
import type { WishlistInsightsItem } from './wishlist-insights.model';
import { WISHLIST_INSIGHTS_FEATURE } from './wishlist-insights.routes';
import {
  formatWishlistInsightsAmount,
  wishlistInsightsStatusTone,
} from './wishlist-insights.utils';

export interface WishlistInsightsTableProps {
  items: ReadonlyArray<WishlistInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistInsightsTable({
  items,
  selectedId,
  onSelect,
}: WishlistInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-empty`}
      >
        No wishlist insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaTile
                label={item.status}
                tone={wishlistInsightsStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
