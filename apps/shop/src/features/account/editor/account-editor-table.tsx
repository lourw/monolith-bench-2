import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import type { AccountEditorItem } from './account-editor.model';
import { ACCOUNT_EDITOR_FEATURE } from './account-editor.routes';
import {
  formatAccountEditorAmount,
  accountEditorStatusTone,
} from './account-editor.utils';

export interface AccountEditorTableProps {
  items: ReadonlyArray<AccountEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountEditorTable({
  items,
  selectedId,
  onSelect,
}: AccountEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-empty`}
      >
        No account editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsBanner
                label={item.status}
                tone={accountEditorStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
