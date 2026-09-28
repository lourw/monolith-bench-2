import { OverlayTile } from '../../../components/overlay/tile/overlay-tile';
import type { CompareEditorItem } from './compare-editor.model';
import { COMPARE_EDITOR_FEATURE } from './compare-editor.routes';
import {
  formatCompareEditorAmount,
  compareEditorStatusTone,
} from './compare-editor.utils';

export interface CompareEditorTableProps {
  items: ReadonlyArray<CompareEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareEditorTable({
  items,
  selectedId,
  onSelect,
}: CompareEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_EDITOR_FEATURE.testId}-empty`}
      >
        No compare editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayTile
                label={item.status}
                tone={compareEditorStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
