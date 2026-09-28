import { InputsCardGroup } from '../../../components/inputs/card/inputs-card-group';
import { buildLoyaltySummaryItems } from './loyalty-summary.model';
import { LOYALTY_SUMMARY_FEATURE } from './loyalty-summary.routes';
import {
  pickLoyaltySummaryHighlights,
  totalLoyaltySummary,
} from './loyalty-summary.utils';

export interface LoyaltySummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltySummarySummary({
  compact = false,
  limit = 3,
}: LoyaltySummarySummaryProps) {
  const items = buildLoyaltySummaryItems();
  const totals = totalLoyaltySummary(items);
  const highlights = pickLoyaltySummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{LOYALTY_SUMMARY_FEATURE.title}</h3>
      <InputsCardGroup
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
