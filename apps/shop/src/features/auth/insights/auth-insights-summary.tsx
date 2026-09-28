import { ChartsToolbarGroup } from '../../../components/charts/toolbar/charts-toolbar-group';
import { buildAuthInsightsItems } from './auth-insights.model';
import { AUTH_INSIGHTS_FEATURE } from './auth-insights.routes';
import {
  pickAuthInsightsHighlights,
  totalAuthInsights,
} from './auth-insights.utils';

export interface AuthInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthInsightsSummary({
  compact = false,
  limit = 3,
}: AuthInsightsSummaryProps) {
  const items = buildAuthInsightsItems();
  const totals = totalAuthInsights(items);
  const highlights = pickAuthInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_INSIGHTS_FEATURE.title}</h3>
      <ChartsToolbarGroup
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
