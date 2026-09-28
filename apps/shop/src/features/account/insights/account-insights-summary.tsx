import { LayoutBadgeGroup } from '../../../components/layout/badge/layout-badge-group';
import { buildAccountInsightsItems } from './account-insights.model';
import { ACCOUNT_INSIGHTS_FEATURE } from './account-insights.routes';
import {
  pickAccountInsightsHighlights,
  totalAccountInsights,
} from './account-insights.utils';

export interface AccountInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountInsightsSummary({
  compact = false,
  limit = 3,
}: AccountInsightsSummaryProps) {
  const items = buildAccountInsightsItems();
  const totals = totalAccountInsights(items);
  const highlights = pickAccountInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ACCOUNT_INSIGHTS_FEATURE.title}
      </h3>
      <LayoutBadgeGroup
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
