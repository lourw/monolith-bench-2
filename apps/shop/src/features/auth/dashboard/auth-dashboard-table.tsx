import { MarketingToolbar } from '../../../components/marketing/toolbar/marketing-toolbar';
import type { AuthDashboardItem } from './auth-dashboard.model';
import { AUTH_DASHBOARD_FEATURE } from './auth-dashboard.routes';
import {
  formatAuthDashboardAmount,
  authDashboardStatusTone,
} from './auth-dashboard.utils';

export interface AuthDashboardTableProps {
  items: ReadonlyArray<AuthDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthDashboardTable({
  items,
  selectedId,
  onSelect,
}: AuthDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-empty`}
      >
        No auth dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingToolbar
                label={item.status}
                tone={authDashboardStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
