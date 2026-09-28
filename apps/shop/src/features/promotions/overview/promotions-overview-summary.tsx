import { MarketingBannerGroup } from '../../../components/marketing/banner/marketing-banner-group';
import { buildPromotionsOverviewItems } from './promotions-overview.model';
import { PROMOTIONS_OVERVIEW_FEATURE } from './promotions-overview.routes';
import {
  pickPromotionsOverviewHighlights,
  totalPromotionsOverview,
} from './promotions-overview.utils';

export interface PromotionsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsOverviewSummary({
  compact = false,
  limit = 3,
}: PromotionsOverviewSummaryProps) {
  const items = buildPromotionsOverviewItems();
  const totals = totalPromotionsOverview(items);
  const highlights = pickPromotionsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_OVERVIEW_FEATURE.title}
      </h3>
      <MarketingBannerGroup
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
