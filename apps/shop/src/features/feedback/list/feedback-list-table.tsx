import { OverlayBanner } from '../../../components/overlay/banner/overlay-banner';
import type { FeedbackListItem } from './feedback-list.model';
import { FEEDBACK_LIST_FEATURE } from './feedback-list.routes';
import {
  formatFeedbackListAmount,
  feedbackListStatusTone,
} from './feedback-list.utils';

export interface FeedbackListTableProps {
  items: ReadonlyArray<FeedbackListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackListTable({
  items,
  selectedId,
  onSelect,
}: FeedbackListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_LIST_FEATURE.testId}-empty`}
      >
        No feedback list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_LIST_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayBanner
                label={item.status}
                tone={feedbackListStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
