import { FeedbackStatGroup } from '../../../components/feedback/stat/feedback-stat-group';
import { buildPreordersSummaryItems } from './preorders-summary.model';
import { PREORDERS_SUMMARY_FEATURE } from './preorders-summary.routes';
import {
  pickPreordersSummaryHighlights,
  totalPreordersSummary,
} from './preorders-summary.utils';

export interface PreordersSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersSummarySummary({
  compact = false,
  limit = 3,
}: PreordersSummarySummaryProps) {
  const items = buildPreordersSummaryItems();
  const totals = totalPreordersSummary(items);
  const highlights = pickPreordersSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_SUMMARY_FEATURE.title}
      </h3>
      <FeedbackStatGroup
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
