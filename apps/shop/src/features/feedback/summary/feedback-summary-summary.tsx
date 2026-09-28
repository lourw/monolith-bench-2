import { CoreTileGroup } from '../../../components/core/tile/core-tile-group';
import { buildFeedbackSummaryItems } from './feedback-summary.model';
import { FEEDBACK_SUMMARY_FEATURE } from './feedback-summary.routes';
import {
  pickFeedbackSummaryHighlights,
  totalFeedbackSummary,
} from './feedback-summary.utils';

export interface FeedbackSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackSummarySummary({
  compact = false,
  limit = 3,
}: FeedbackSummarySummaryProps) {
  const items = buildFeedbackSummaryItems();
  const totals = totalFeedbackSummary(items);
  const highlights = pickFeedbackSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {FEEDBACK_SUMMARY_FEATURE.title}
      </h3>
      <CoreTileGroup
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
