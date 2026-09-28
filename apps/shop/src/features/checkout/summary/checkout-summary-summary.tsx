import { FeedbackHeaderGroup } from '../../../components/feedback/header/feedback-header-group';
import { buildCheckoutSummaryItems } from './checkout-summary.model';
import { CHECKOUT_SUMMARY_FEATURE } from './checkout-summary.routes';
import {
  pickCheckoutSummaryHighlights,
  totalCheckoutSummary,
} from './checkout-summary.utils';

export interface CheckoutSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutSummarySummary({
  compact = false,
  limit = 3,
}: CheckoutSummarySummaryProps) {
  const items = buildCheckoutSummaryItems();
  const totals = totalCheckoutSummary(items);
  const highlights = pickCheckoutSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CHECKOUT_SUMMARY_FEATURE.title}
      </h3>
      <FeedbackHeaderGroup
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
