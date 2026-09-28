import { NavigationToolbar } from '../../../components/navigation/toolbar/navigation-toolbar';
import type { SupportEditorItem } from './support-editor.model';
import { SUPPORT_EDITOR_FEATURE } from './support-editor.routes';
import {
  formatSupportEditorAmount,
  supportEditorStatusTone,
} from './support-editor.utils';

export interface SupportEditorTableProps {
  items: ReadonlyArray<SupportEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportEditorTable({
  items,
  selectedId,
  onSelect,
}: SupportEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-empty`}
      >
        No support editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationToolbar
                label={item.status}
                tone={supportEditorStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
