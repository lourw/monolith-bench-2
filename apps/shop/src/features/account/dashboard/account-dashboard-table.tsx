import { TypographyBanner } from '../../../components/typography/banner/typography-banner';
import type { AccountDashboardItem } from './account-dashboard.model';
import { ACCOUNT_DASHBOARD_FEATURE } from './account-dashboard.routes';
import {
  formatAccountDashboardAmount,
  accountDashboardStatusTone,
} from './account-dashboard.utils';

export interface AccountDashboardTableProps {
  items: ReadonlyArray<AccountDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountDashboardTable({
  items,
  selectedId,
  onSelect,
}: AccountDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-empty`}
      >
        No account dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyBanner
                label={item.status}
                tone={accountDashboardStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
