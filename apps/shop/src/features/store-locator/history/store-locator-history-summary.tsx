import { FeedbackBannerGroup } from '../../../components/feedback/banner/feedback-banner-group';
import { buildStoreLocatorHistoryItems } from './store-locator-history.model';
import { STORE_LOCATOR_HISTORY_FEATURE } from './store-locator-history.routes';
import {
  pickStoreLocatorHistoryHighlights,
  totalStoreLocatorHistory,
} from './store-locator-history.utils';

export interface StoreLocatorHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorHistorySummary({
  compact = false,
  limit = 3,
}: StoreLocatorHistorySummaryProps) {
  const items = buildStoreLocatorHistoryItems();
  const totals = totalStoreLocatorHistory(items);
  const highlights = pickStoreLocatorHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_HISTORY_FEATURE.title}
      </h3>
      <FeedbackBannerGroup
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
