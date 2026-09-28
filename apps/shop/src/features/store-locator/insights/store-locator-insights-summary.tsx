import { FeedbackTileGroup } from '../../../components/feedback/tile/feedback-tile-group';
import { buildStoreLocatorInsightsItems } from './store-locator-insights.model';
import { STORE_LOCATOR_INSIGHTS_FEATURE } from './store-locator-insights.routes';
import {
  pickStoreLocatorInsightsHighlights,
  totalStoreLocatorInsights,
} from './store-locator-insights.utils';

export interface StoreLocatorInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorInsightsSummary({
  compact = false,
  limit = 3,
}: StoreLocatorInsightsSummaryProps) {
  const items = buildStoreLocatorInsightsItems();
  const totals = totalStoreLocatorInsights(items);
  const highlights = pickStoreLocatorInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_INSIGHTS_FEATURE.title}
      </h3>
      <FeedbackTileGroup
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
