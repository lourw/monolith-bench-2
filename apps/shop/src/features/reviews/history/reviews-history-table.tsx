import { TypographyChip } from '../../../components/typography/chip/typography-chip';
import type { ReviewsHistoryItem } from './reviews-history.model';
import { REVIEWS_HISTORY_FEATURE } from './reviews-history.routes';
import {
  formatReviewsHistoryAmount,
  reviewsHistoryStatusTone,
} from './reviews-history.utils';

export interface ReviewsHistoryTableProps {
  items: ReadonlyArray<ReviewsHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsHistoryTable({
  items,
  selectedId,
  onSelect,
}: ReviewsHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-empty`}
      >
        No reviews history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyChip
                label={item.status}
                tone={reviewsHistoryStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
