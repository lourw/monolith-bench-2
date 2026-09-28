import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import type { TrackingEditorItem } from './tracking-editor.model';
import { TRACKING_EDITOR_FEATURE } from './tracking-editor.routes';
import {
  formatTrackingEditorAmount,
  trackingEditorStatusTone,
} from './tracking-editor.utils';

export interface TrackingEditorTableProps {
  items: ReadonlyArray<TrackingEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingEditorTable({
  items,
  selectedId,
  onSelect,
}: TrackingEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_EDITOR_FEATURE.testId}-empty`}
      >
        No tracking editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyPanel
                label={item.status}
                tone={trackingEditorStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
