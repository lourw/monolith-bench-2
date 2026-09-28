import { MarketingHeader } from '../../../components/marketing/header/marketing-header';
import type { FeedbackEditorItem } from './feedback-editor.model';
import { FEEDBACK_EDITOR_FEATURE } from './feedback-editor.routes';
import {
  formatFeedbackEditorAmount,
  feedbackEditorStatusTone,
} from './feedback-editor.utils';

export interface FeedbackEditorTableProps {
  items: ReadonlyArray<FeedbackEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackEditorTable({
  items,
  selectedId,
  onSelect,
}: FeedbackEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-empty`}
      >
        No feedback editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingHeader
                label={item.status}
                tone={feedbackEditorStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
