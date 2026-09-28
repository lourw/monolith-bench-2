import { CoreStatGroup } from '../../../components/core/stat/core-stat-group';
import { buildPaymentsSummaryItems } from './payments-summary.model';
import { PAYMENTS_SUMMARY_FEATURE } from './payments-summary.routes';
import {
  pickPaymentsSummaryHighlights,
  totalPaymentsSummary,
} from './payments-summary.utils';

export interface PaymentsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsSummarySummary({
  compact = false,
  limit = 3,
}: PaymentsSummarySummaryProps) {
  const items = buildPaymentsSummaryItems();
  const totals = totalPaymentsSummary(items);
  const highlights = pickPaymentsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PAYMENTS_SUMMARY_FEATURE.title}
      </h3>
      <CoreStatGroup
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
