import { MediaToolbarGroup } from '../../../components/media/toolbar/media-toolbar-group';
import { buildFeedbackHistoryItems } from './feedback-history.model';
import { FEEDBACK_HISTORY_FEATURE } from './feedback-history.routes';
import {
  pickFeedbackHistoryHighlights,
  totalFeedbackHistory,
} from './feedback-history.utils';

export interface FeedbackHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackHistorySummary({
  compact = false,
  limit = 3,
}: FeedbackHistorySummaryProps) {
  const items = buildFeedbackHistoryItems();
  const totals = totalFeedbackHistory(items);
  const highlights = pickFeedbackHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {FEEDBACK_HISTORY_FEATURE.title}
      </h3>
      <MediaToolbarGroup
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
