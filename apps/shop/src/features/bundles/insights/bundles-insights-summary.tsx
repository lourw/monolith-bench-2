import { FormsCardGroup } from '../../../components/forms/card/forms-card-group';
import { buildBundlesInsightsItems } from './bundles-insights.model';
import { BUNDLES_INSIGHTS_FEATURE } from './bundles-insights.routes';
import {
  pickBundlesInsightsHighlights,
  totalBundlesInsights,
} from './bundles-insights.utils';

export interface BundlesInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesInsightsSummary({
  compact = false,
  limit = 3,
}: BundlesInsightsSummaryProps) {
  const items = buildBundlesInsightsItems();
  const totals = totalBundlesInsights(items);
  const highlights = pickBundlesInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {BUNDLES_INSIGHTS_FEATURE.title}
      </h3>
      <FormsCardGroup
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
