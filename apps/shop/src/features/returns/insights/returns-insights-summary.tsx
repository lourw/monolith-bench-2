import { TypographyCardGroup } from '../../../components/typography/card/typography-card-group';
import { buildReturnsInsightsItems } from './returns-insights.model';
import { RETURNS_INSIGHTS_FEATURE } from './returns-insights.routes';
import {
  pickReturnsInsightsHighlights,
  totalReturnsInsights,
} from './returns-insights.utils';

export interface ReturnsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsInsightsSummary({
  compact = false,
  limit = 3,
}: ReturnsInsightsSummaryProps) {
  const items = buildReturnsInsightsItems();
  const totals = totalReturnsInsights(items);
  const highlights = pickReturnsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RETURNS_INSIGHTS_FEATURE.title}
      </h3>
      <TypographyCardGroup
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
