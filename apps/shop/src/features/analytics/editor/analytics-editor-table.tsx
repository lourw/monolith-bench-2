import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import type { AnalyticsEditorItem } from './analytics-editor.model';
import { ANALYTICS_EDITOR_FEATURE } from './analytics-editor.routes';
import {
  formatAnalyticsEditorAmount,
  analyticsEditorStatusTone,
} from './analytics-editor.utils';

export interface AnalyticsEditorTableProps {
  items: ReadonlyArray<AnalyticsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsEditorTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-empty`}
      >
        No analytics editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackCard
                label={item.status}
                tone={analyticsEditorStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
