import { CoreList } from '../../../components/core/list/core-list';
import type { AuthHistoryItem } from './auth-history.model';
import { AUTH_HISTORY_FEATURE } from './auth-history.routes';
import {
  formatAuthHistoryAmount,
  authHistoryStatusTone,
} from './auth-history.utils';

export interface AuthHistoryTableProps {
  items: ReadonlyArray<AuthHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthHistoryTable({
  items,
  selectedId,
  onSelect,
}: AuthHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_HISTORY_FEATURE.testId}-empty`}
      >
        No auth history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreList
                label={item.status}
                tone={authHistoryStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
