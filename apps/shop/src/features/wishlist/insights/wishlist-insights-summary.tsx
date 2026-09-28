import { DataBannerGroup } from '../../../components/data/banner/data-banner-group';
import { buildWishlistInsightsItems } from './wishlist-insights.model';
import { WISHLIST_INSIGHTS_FEATURE } from './wishlist-insights.routes';
import {
  pickWishlistInsightsHighlights,
  totalWishlistInsights,
} from './wishlist-insights.utils';

export interface WishlistInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistInsightsSummary({
  compact = false,
  limit = 3,
}: WishlistInsightsSummaryProps) {
  const items = buildWishlistInsightsItems();
  const totals = totalWishlistInsights(items);
  const highlights = pickWishlistInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {WISHLIST_INSIGHTS_FEATURE.title}
      </h3>
      <DataBannerGroup
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
