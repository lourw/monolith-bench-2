import { FeedbackChipGroup } from '../../../components/feedback/chip/feedback-chip-group';
import { buildPaymentsOverviewItems } from './payments-overview.model';
import { PAYMENTS_OVERVIEW_FEATURE } from './payments-overview.routes';
import {
  pickPaymentsOverviewHighlights,
  totalPaymentsOverview,
} from './payments-overview.utils';

export interface PaymentsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsOverviewSummary({
  compact = false,
  limit = 3,
}: PaymentsOverviewSummaryProps) {
  const items = buildPaymentsOverviewItems();
  const totals = totalPaymentsOverview(items);
  const highlights = pickPaymentsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PAYMENTS_OVERVIEW_FEATURE.title}
      </h3>
      <FeedbackChipGroup
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
