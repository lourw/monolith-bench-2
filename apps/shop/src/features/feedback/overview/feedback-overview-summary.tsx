import { CommerceStatGroup } from '../../../components/commerce/stat/commerce-stat-group';
import { buildFeedbackOverviewItems } from './feedback-overview.model';
import { FEEDBACK_OVERVIEW_FEATURE } from './feedback-overview.routes';
import {
  pickFeedbackOverviewHighlights,
  totalFeedbackOverview,
} from './feedback-overview.utils';

export interface FeedbackOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackOverviewSummary({
  compact = false,
  limit = 3,
}: FeedbackOverviewSummaryProps) {
  const items = buildFeedbackOverviewItems();
  const totals = totalFeedbackOverview(items);
  const highlights = pickFeedbackOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {FEEDBACK_OVERVIEW_FEATURE.title}
      </h3>
      <CommerceStatGroup
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
