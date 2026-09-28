import { LayoutBannerGroup } from '../../../components/layout/banner/layout-banner-group';
import { buildSizingInsightsItems } from './sizing-insights.model';
import { SIZING_INSIGHTS_FEATURE } from './sizing-insights.routes';
import {
  pickSizingInsightsHighlights,
  totalSizingInsights,
} from './sizing-insights.utils';

export interface SizingInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingInsightsSummary({
  compact = false,
  limit = 3,
}: SizingInsightsSummaryProps) {
  const items = buildSizingInsightsItems();
  const totals = totalSizingInsights(items);
  const highlights = pickSizingInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_INSIGHTS_FEATURE.title}</h3>
      <LayoutBannerGroup
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
