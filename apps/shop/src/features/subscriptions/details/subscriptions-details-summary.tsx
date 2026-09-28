import { MediaChipGroup } from '../../../components/media/chip/media-chip-group';
import { buildSubscriptionsDetailsItems } from './subscriptions-details.model';
import { SUBSCRIPTIONS_DETAILS_FEATURE } from './subscriptions-details.routes';
import {
  pickSubscriptionsDetailsHighlights,
  totalSubscriptionsDetails,
} from './subscriptions-details.utils';

export interface SubscriptionsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsDetailsSummary({
  compact = false,
  limit = 3,
}: SubscriptionsDetailsSummaryProps) {
  const items = buildSubscriptionsDetailsItems();
  const totals = totalSubscriptionsDetails(items);
  const highlights = pickSubscriptionsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_DETAILS_FEATURE.title}
      </h3>
      <MediaChipGroup
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
