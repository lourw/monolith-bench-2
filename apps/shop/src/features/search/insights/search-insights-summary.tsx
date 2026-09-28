import { MarketingCardGroup } from '../../../components/marketing/card/marketing-card-group';
import { buildSearchInsightsItems } from './search-insights.model';
import { SEARCH_INSIGHTS_FEATURE } from './search-insights.routes';
import {
  pickSearchInsightsHighlights,
  totalSearchInsights,
} from './search-insights.utils';

export interface SearchInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchInsightsSummary({
  compact = false,
  limit = 3,
}: SearchInsightsSummaryProps) {
  const items = buildSearchInsightsItems();
  const totals = totalSearchInsights(items);
  const highlights = pickSearchInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_INSIGHTS_FEATURE.title}</h3>
      <MarketingCardGroup
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
