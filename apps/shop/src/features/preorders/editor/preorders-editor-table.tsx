import { InputsTile } from '../../../components/inputs/tile/inputs-tile';
import type { PreordersEditorItem } from './preorders-editor.model';
import { PREORDERS_EDITOR_FEATURE } from './preorders-editor.routes';
import {
  formatPreordersEditorAmount,
  preordersEditorStatusTone,
} from './preorders-editor.utils';

export interface PreordersEditorTableProps {
  items: ReadonlyArray<PreordersEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersEditorTable({
  items,
  selectedId,
  onSelect,
}: PreordersEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-empty`}
      >
        No preorders editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsTile
                label={item.status}
                tone={preordersEditorStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
