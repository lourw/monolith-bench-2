import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import type { ReviewsOverviewItem } from './reviews-overview.model';
import { REVIEWS_OVERVIEW_FEATURE } from './reviews-overview.routes';
import {
  formatReviewsOverviewAmount,
  reviewsOverviewStatusTone,
} from './reviews-overview.utils';

export interface ReviewsOverviewTableProps {
  items: ReadonlyArray<ReviewsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsOverviewTable({
  items,
  selectedId,
  onSelect,
}: ReviewsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No reviews overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaToolbar
                label={item.status}
                tone={reviewsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
