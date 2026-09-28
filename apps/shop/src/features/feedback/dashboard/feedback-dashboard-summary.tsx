import { InputsCardGroup } from '../../../components/inputs/card/inputs-card-group';
import { buildFeedbackDashboardItems } from './feedback-dashboard.model';
import { FEEDBACK_DASHBOARD_FEATURE } from './feedback-dashboard.routes';
import {
  pickFeedbackDashboardHighlights,
  totalFeedbackDashboard,
} from './feedback-dashboard.utils';

export interface FeedbackDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackDashboardSummary({
  compact = false,
  limit = 3,
}: FeedbackDashboardSummaryProps) {
  const items = buildFeedbackDashboardItems();
  const totals = totalFeedbackDashboard(items);
  const highlights = pickFeedbackDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {FEEDBACK_DASHBOARD_FEATURE.title}
      </h3>
      <InputsCardGroup
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
