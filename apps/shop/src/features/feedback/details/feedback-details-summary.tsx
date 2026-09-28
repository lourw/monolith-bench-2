import { ChartsTileGroup } from '../../../components/charts/tile/charts-tile-group';
import { buildFeedbackDetailsItems } from './feedback-details.model';
import { FEEDBACK_DETAILS_FEATURE } from './feedback-details.routes';
import {
  pickFeedbackDetailsHighlights,
  totalFeedbackDetails,
} from './feedback-details.utils';

export interface FeedbackDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackDetailsSummary({
  compact = false,
  limit = 3,
}: FeedbackDetailsSummaryProps) {
  const items = buildFeedbackDetailsItems();
  const totals = totalFeedbackDetails(items);
  const highlights = pickFeedbackDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {FEEDBACK_DETAILS_FEATURE.title}
      </h3>
      <ChartsTileGroup
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
