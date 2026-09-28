import { NavigationStat } from '../../../components/navigation/stat/navigation-stat';
import type { WishlistSummaryItem } from './wishlist-summary.model';
import { WISHLIST_SUMMARY_FEATURE } from './wishlist-summary.routes';
import {
  formatWishlistSummaryAmount,
  wishlistSummaryStatusTone,
} from './wishlist-summary.utils';

export interface WishlistSummaryTableProps {
  items: ReadonlyArray<WishlistSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistSummaryTable({
  items,
  selectedId,
  onSelect,
}: WishlistSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-empty`}
      >
        No wishlist summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationStat
                label={item.status}
                tone={wishlistSummaryStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
