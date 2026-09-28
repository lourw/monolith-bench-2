import { FeedbackListGroup } from '../../../components/feedback/list/feedback-list-group';
import { buildRecommendationsListItems } from './recommendations-list.model';
import { RECOMMENDATIONS_LIST_FEATURE } from './recommendations-list.routes';
import {
  pickRecommendationsListHighlights,
  totalRecommendationsList,
} from './recommendations-list.utils';

export interface RecommendationsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsListSummary({
  compact = false,
  limit = 3,
}: RecommendationsListSummaryProps) {
  const items = buildRecommendationsListItems();
  const totals = totalRecommendationsList(items);
  const highlights = pickRecommendationsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_LIST_FEATURE.title}
      </h3>
      <FeedbackListGroup
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
