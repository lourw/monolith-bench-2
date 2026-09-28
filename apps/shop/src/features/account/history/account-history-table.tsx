import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { AccountHistoryItem } from './account-history.model';
import { ACCOUNT_HISTORY_FEATURE } from './account-history.routes';
import {
  formatAccountHistoryAmount,
  accountHistoryStatusTone,
} from './account-history.utils';

export interface AccountHistoryTableProps {
  items: ReadonlyArray<AccountHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountHistoryTable({
  items,
  selectedId,
  onSelect,
}: AccountHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-empty`}
      >
        No account history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsBadge
                label={item.status}
                tone={accountHistoryStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
