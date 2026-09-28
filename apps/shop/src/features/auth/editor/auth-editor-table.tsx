import { FormsTile } from '../../../components/forms/tile/forms-tile';
import type { AuthEditorItem } from './auth-editor.model';
import { AUTH_EDITOR_FEATURE } from './auth-editor.routes';
import {
  formatAuthEditorAmount,
  authEditorStatusTone,
} from './auth-editor.utils';

export interface AuthEditorTableProps {
  items: ReadonlyArray<AuthEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthEditorTable({
  items,
  selectedId,
  onSelect,
}: AuthEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_EDITOR_FEATURE.testId}-empty`}
      >
        No auth editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsTile
                label={item.status}
                tone={authEditorStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
