import { DataBannerGroup } from '../../../components/data/banner/data-banner-group';
import { buildCompareInsightsItems } from './compare-insights.model';
import { COMPARE_INSIGHTS_FEATURE } from './compare-insights.routes';
import {
  pickCompareInsightsHighlights,
  totalCompareInsights,
} from './compare-insights.utils';

export interface CompareInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareInsightsSummary({
  compact = false,
  limit = 3,
}: CompareInsightsSummaryProps) {
  const items = buildCompareInsightsItems();
  const totals = totalCompareInsights(items);
  const highlights = pickCompareInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {COMPARE_INSIGHTS_FEATURE.title}
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
