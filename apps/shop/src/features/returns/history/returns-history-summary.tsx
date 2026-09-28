import { FeedbackStatGroup } from '../../../components/feedback/stat/feedback-stat-group';
import { buildReturnsHistoryItems } from './returns-history.model';
import { RETURNS_HISTORY_FEATURE } from './returns-history.routes';
import {
  pickReturnsHistoryHighlights,
  totalReturnsHistory,
} from './returns-history.utils';

export interface ReturnsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsHistorySummary({
  compact = false,
  limit = 3,
}: ReturnsHistorySummaryProps) {
  const items = buildReturnsHistoryItems();
  const totals = totalReturnsHistory(items);
  const highlights = pickReturnsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{RETURNS_HISTORY_FEATURE.title}</h3>
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
