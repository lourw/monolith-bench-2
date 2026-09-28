import { InputsBanner } from '../../../components/inputs/banner/inputs-banner';
import type { SizingEditorItem } from './sizing-editor.model';
import { SIZING_EDITOR_FEATURE } from './sizing-editor.routes';
import {
  formatSizingEditorAmount,
  sizingEditorStatusTone,
} from './sizing-editor.utils';

export interface SizingEditorTableProps {
  items: ReadonlyArray<SizingEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingEditorTable({
  items,
  selectedId,
  onSelect,
}: SizingEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_EDITOR_FEATURE.testId}-empty`}
      >
        No sizing editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsBanner
                label={item.status}
                tone={sizingEditorStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
