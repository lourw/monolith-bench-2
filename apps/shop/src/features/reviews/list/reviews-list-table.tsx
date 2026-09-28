import { FormsList } from '../../../components/forms/list/forms-list';
import type { ReviewsListItem } from './reviews-list.model';
import { REVIEWS_LIST_FEATURE } from './reviews-list.routes';
import {
  formatReviewsListAmount,
  reviewsListStatusTone,
} from './reviews-list.utils';

export interface ReviewsListTableProps {
  items: ReadonlyArray<ReviewsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsListTable({
  items,
  selectedId,
  onSelect,
}: ReviewsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_LIST_FEATURE.testId}-empty`}
      >
        No reviews list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${REVIEWS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsList
                label={item.status}
                tone={reviewsListStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
