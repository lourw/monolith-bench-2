import { FormsPanel } from '../../../components/forms/panel/forms-panel';
import type { FeedbackWizardItem } from './feedback-wizard.model';
import { FEEDBACK_WIZARD_FEATURE } from './feedback-wizard.routes';
import {
  formatFeedbackWizardAmount,
  feedbackWizardStatusTone,
} from './feedback-wizard.utils';

export interface FeedbackWizardTableProps {
  items: ReadonlyArray<FeedbackWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackWizardTable({
  items,
  selectedId,
  onSelect,
}: FeedbackWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-empty`}
      >
        No feedback wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsPanel
                label={item.status}
                tone={feedbackWizardStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
