import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import type { FeedbackSettingsItem } from './feedback-settings.model';
import { FEEDBACK_SETTINGS_FEATURE } from './feedback-settings.routes';
import {
  formatFeedbackSettingsAmount,
  feedbackSettingsStatusTone,
} from './feedback-settings.utils';

export interface FeedbackSettingsTableProps {
  items: ReadonlyArray<FeedbackSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackSettingsTable({
  items,
  selectedId,
  onSelect,
}: FeedbackSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_SETTINGS_FEATURE.testId}-empty`}
      >
        No feedback settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceBadge
                label={item.status}
                tone={feedbackSettingsStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
