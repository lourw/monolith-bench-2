import { CommerceBannerGroup } from '../../../components/commerce/banner/commerce-banner-group';
import { buildTrackingInsightsItems } from './tracking-insights.model';
import { TRACKING_INSIGHTS_FEATURE } from './tracking-insights.routes';
import {
  pickTrackingInsightsHighlights,
  totalTrackingInsights,
} from './tracking-insights.utils';

export interface TrackingInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingInsightsSummary({
  compact = false,
  limit = 3,
}: TrackingInsightsSummaryProps) {
  const items = buildTrackingInsightsItems();
  const totals = totalTrackingInsights(items);
  const highlights = pickTrackingInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {TRACKING_INSIGHTS_FEATURE.title}
      </h3>
      <CommerceBannerGroup
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
