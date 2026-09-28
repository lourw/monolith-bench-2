import { MediaChip } from '../../../components/media/chip/media-chip';
import type { ReviewsEditorItem } from './reviews-editor.model';
import { REVIEWS_EDITOR_FEATURE } from './reviews-editor.routes';
import {
  formatReviewsEditorAmount,
  reviewsEditorStatusTone,
} from './reviews-editor.utils';

export interface ReviewsEditorTableProps {
  items: ReadonlyArray<ReviewsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsEditorTable({
  items,
  selectedId,
  onSelect,
}: ReviewsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-empty`}
      >
        No reviews editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaChip
                label={item.status}
                tone={reviewsEditorStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
