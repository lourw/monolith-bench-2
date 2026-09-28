import { FeedbackHeaderGroup } from '../../../components/feedback/header/feedback-header-group';
import { buildAuthHistoryItems } from './auth-history.model';
import { AUTH_HISTORY_FEATURE } from './auth-history.routes';
import {
  pickAuthHistoryHighlights,
  totalAuthHistory,
} from './auth-history.utils';

export interface AuthHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthHistorySummary({
  compact = false,
  limit = 3,
}: AuthHistorySummaryProps) {
  const items = buildAuthHistoryItems();
  const totals = totalAuthHistory(items);
  const highlights = pickAuthHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_HISTORY_FEATURE.title}</h3>
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
