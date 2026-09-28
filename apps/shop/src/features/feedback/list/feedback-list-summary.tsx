import { MarketingHeaderGroup } from '../../../components/marketing/header/marketing-header-group';
import { buildFeedbackListItems } from './feedback-list.model';
import { FEEDBACK_LIST_FEATURE } from './feedback-list.routes';
import {
  pickFeedbackListHighlights,
  totalFeedbackList,
} from './feedback-list.utils';

export interface FeedbackListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackListSummary({
  compact = false,
  limit = 3,
}: FeedbackListSummaryProps) {
  const items = buildFeedbackListItems();
  const totals = totalFeedbackList(items);
  const highlights = pickFeedbackListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{FEEDBACK_LIST_FEATURE.title}</h3>
      <MarketingHeaderGroup
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
