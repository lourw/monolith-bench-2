import { CommercePanel } from '../../../components/commerce/panel/commerce-panel';
import type { AccountOverviewItem } from './account-overview.model';
import { ACCOUNT_OVERVIEW_FEATURE } from './account-overview.routes';
import {
  formatAccountOverviewAmount,
  accountOverviewStatusTone,
} from './account-overview.utils';

export interface AccountOverviewTableProps {
  items: ReadonlyArray<AccountOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountOverviewTable({
  items,
  selectedId,
  onSelect,
}: AccountOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-empty`}
      >
        No account overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommercePanel
                label={item.status}
                tone={accountOverviewStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
