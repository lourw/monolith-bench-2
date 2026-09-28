import { MarketingList } from '../../../components/marketing/list/marketing-list';
import type { FeedbackDetailsItem } from './feedback-details.model';
import { FEEDBACK_DETAILS_FEATURE } from './feedback-details.routes';
import {
  formatFeedbackDetailsAmount,
  feedbackDetailsStatusTone,
} from './feedback-details.utils';

export interface FeedbackDetailsTableProps {
  items: ReadonlyArray<FeedbackDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackDetailsTable({
  items,
  selectedId,
  onSelect,
}: FeedbackDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_DETAILS_FEATURE.testId}-empty`}
      >
        No feedback details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingList
                label={item.status}
                tone={feedbackDetailsStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
