import { TypographyTileGroup } from '../../../components/typography/tile/typography-tile-group';
import { buildWishlistDashboardItems } from './wishlist-dashboard.model';
import { WISHLIST_DASHBOARD_FEATURE } from './wishlist-dashboard.routes';
import {
  pickWishlistDashboardHighlights,
  totalWishlistDashboard,
} from './wishlist-dashboard.utils';

export interface WishlistDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistDashboardSummary({
  compact = false,
  limit = 3,
}: WishlistDashboardSummaryProps) {
  const items = buildWishlistDashboardItems();
  const totals = totalWishlistDashboard(items);
  const highlights = pickWishlistDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {WISHLIST_DASHBOARD_FEATURE.title}
      </h3>
      <TypographyTileGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
