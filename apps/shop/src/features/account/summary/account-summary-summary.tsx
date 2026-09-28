import { FeedbackChipGroup } from '../../../components/feedback/chip/feedback-chip-group';
import { buildAccountSummaryItems } from './account-summary.model';
import { ACCOUNT_SUMMARY_FEATURE } from './account-summary.routes';
import {
  pickAccountSummaryHighlights,
  totalAccountSummary,
} from './account-summary.utils';

export interface AccountSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountSummarySummary({
  compact = false,
  limit = 3,
}: AccountSummarySummaryProps) {
  const items = buildAccountSummaryItems();
  const totals = totalAccountSummary(items);
  const highlights = pickAccountSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ACCOUNT_SUMMARY_FEATURE.title}</h3>
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
