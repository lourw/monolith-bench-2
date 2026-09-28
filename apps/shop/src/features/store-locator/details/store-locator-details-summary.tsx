import { FeedbackCardGroup } from '../../../components/feedback/card/feedback-card-group';
import { buildStoreLocatorDetailsItems } from './store-locator-details.model';
import { STORE_LOCATOR_DETAILS_FEATURE } from './store-locator-details.routes';
import {
  pickStoreLocatorDetailsHighlights,
  totalStoreLocatorDetails,
} from './store-locator-details.utils';

export interface StoreLocatorDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorDetailsSummary({
  compact = false,
  limit = 3,
}: StoreLocatorDetailsSummaryProps) {
  const items = buildStoreLocatorDetailsItems();
  const totals = totalStoreLocatorDetails(items);
  const highlights = pickStoreLocatorDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_DETAILS_FEATURE.title}
      </h3>
      <FeedbackCardGroup
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
