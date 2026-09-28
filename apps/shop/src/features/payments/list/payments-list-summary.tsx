import { ChartsBadgeGroup } from '../../../components/charts/badge/charts-badge-group';
import { buildPaymentsListItems } from './payments-list.model';
import { PAYMENTS_LIST_FEATURE } from './payments-list.routes';
import {
  pickPaymentsListHighlights,
  totalPaymentsList,
} from './payments-list.utils';

export interface PaymentsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsListSummary({
  compact = false,
  limit = 3,
}: PaymentsListSummaryProps) {
  const items = buildPaymentsListItems();
  const totals = totalPaymentsList(items);
  const highlights = pickPaymentsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PAYMENTS_LIST_FEATURE.title}</h3>
      <ChartsBadgeGroup
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
