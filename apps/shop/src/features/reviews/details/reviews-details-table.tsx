import { ChartsList } from '../../../components/charts/list/charts-list';
import type { ReviewsDetailsItem } from './reviews-details.model';
import { REVIEWS_DETAILS_FEATURE } from './reviews-details.routes';
import {
  formatReviewsDetailsAmount,
  reviewsDetailsStatusTone,
} from './reviews-details.utils';

export interface ReviewsDetailsTableProps {
  items: ReadonlyArray<ReviewsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsDetailsTable({
  items,
  selectedId,
  onSelect,
}: ReviewsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-empty`}
      >
        No reviews details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsList
                label={item.status}
                tone={reviewsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
