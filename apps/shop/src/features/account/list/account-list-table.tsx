import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { AccountListItem } from './account-list.model';
import { ACCOUNT_LIST_FEATURE } from './account-list.routes';
import {
  formatAccountListAmount,
  accountListStatusTone,
} from './account-list.utils';

export interface AccountListTableProps {
  items: ReadonlyArray<AccountListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountListTable({
  items,
  selectedId,
  onSelect,
}: AccountListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_LIST_FEATURE.testId}-empty`}
      >
        No account list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_LIST_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackTile
                label={item.status}
                tone={accountListStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
