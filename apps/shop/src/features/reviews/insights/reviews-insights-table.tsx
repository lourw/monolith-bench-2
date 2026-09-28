import { CommerceCard } from '../../../components/commerce/card/commerce-card';
import type { ReviewsInsightsItem } from './reviews-insights.model';
import { REVIEWS_INSIGHTS_FEATURE } from './reviews-insights.routes';
import {
  formatReviewsInsightsAmount,
  reviewsInsightsStatusTone,
} from './reviews-insights.utils';

export interface ReviewsInsightsTableProps {
  items: ReadonlyArray<ReviewsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsInsightsTable({
  items,
  selectedId,
  onSelect,
}: ReviewsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No reviews insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceCard
                label={item.status}
                tone={reviewsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
