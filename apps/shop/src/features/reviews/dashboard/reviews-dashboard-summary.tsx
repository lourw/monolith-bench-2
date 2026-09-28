import { FormsHeaderGroup } from '../../../components/forms/header/forms-header-group';
import { buildReviewsDashboardItems } from './reviews-dashboard.model';
import { REVIEWS_DASHBOARD_FEATURE } from './reviews-dashboard.routes';
import {
  pickReviewsDashboardHighlights,
  totalReviewsDashboard,
} from './reviews-dashboard.utils';

export interface ReviewsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsDashboardSummary({
  compact = false,
  limit = 3,
}: ReviewsDashboardSummaryProps) {
  const items = buildReviewsDashboardItems();
  const totals = totalReviewsDashboard(items);
  const highlights = pickReviewsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {REVIEWS_DASHBOARD_FEATURE.title}
      </h3>
      <FormsHeaderGroup
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
