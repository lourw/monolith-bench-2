import { CommerceHeaderGroup } from '../../../components/commerce/header/commerce-header-group';
import { buildPreordersInsightsItems } from './preorders-insights.model';
import { PREORDERS_INSIGHTS_FEATURE } from './preorders-insights.routes';
import {
  pickPreordersInsightsHighlights,
  totalPreordersInsights,
} from './preorders-insights.utils';

export interface PreordersInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersInsightsSummary({
  compact = false,
  limit = 3,
}: PreordersInsightsSummaryProps) {
  const items = buildPreordersInsightsItems();
  const totals = totalPreordersInsights(items);
  const highlights = pickPreordersInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_INSIGHTS_FEATURE.title}
      </h3>
      <CommerceHeaderGroup
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
