import { TypographyTileGroup } from '../../../components/typography/tile/typography-tile-group';
import { buildSupportInsightsItems } from './support-insights.model';
import { SUPPORT_INSIGHTS_FEATURE } from './support-insights.routes';
import {
  pickSupportInsightsHighlights,
  totalSupportInsights,
} from './support-insights.utils';

export interface SupportInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportInsightsSummary({
  compact = false,
  limit = 3,
}: SupportInsightsSummaryProps) {
  const items = buildSupportInsightsItems();
  const totals = totalSupportInsights(items);
  const highlights = pickSupportInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUPPORT_INSIGHTS_FEATURE.title}
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
