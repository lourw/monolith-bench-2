import { LayoutBadge } from '../../../components/layout/badge/layout-badge';
import type { AccountDetailsItem } from './account-details.model';
import { ACCOUNT_DETAILS_FEATURE } from './account-details.routes';
import {
  formatAccountDetailsAmount,
  accountDetailsStatusTone,
} from './account-details.utils';

export interface AccountDetailsTableProps {
  items: ReadonlyArray<AccountDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountDetailsTable({
  items,
  selectedId,
  onSelect,
}: AccountDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-empty`}
      >
        No account details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutBadge
                label={item.status}
                tone={accountDetailsStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
