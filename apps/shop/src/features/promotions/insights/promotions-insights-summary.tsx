import { FormsPanelGroup } from '../../../components/forms/panel/forms-panel-group';
import { buildPromotionsInsightsItems } from './promotions-insights.model';
import { PROMOTIONS_INSIGHTS_FEATURE } from './promotions-insights.routes';
import {
  pickPromotionsInsightsHighlights,
  totalPromotionsInsights,
} from './promotions-insights.utils';

export interface PromotionsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsInsightsSummary({
  compact = false,
  limit = 3,
}: PromotionsInsightsSummaryProps) {
  const items = buildPromotionsInsightsItems();
  const totals = totalPromotionsInsights(items);
  const highlights = pickPromotionsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_INSIGHTS_FEATURE.title}
      </h3>
      <FormsPanelGroup
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
