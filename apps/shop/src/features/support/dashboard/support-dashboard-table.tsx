import { LayoutBanner } from '../../../components/layout/banner/layout-banner';
import type { SupportDashboardItem } from './support-dashboard.model';
import { SUPPORT_DASHBOARD_FEATURE } from './support-dashboard.routes';
import {
  formatSupportDashboardAmount,
  supportDashboardStatusTone,
} from './support-dashboard.utils';

export interface SupportDashboardTableProps {
  items: ReadonlyArray<SupportDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportDashboardTable({
  items,
  selectedId,
  onSelect,
}: SupportDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-empty`}
      >
        No support dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutBanner
                label={item.status}
                tone={supportDashboardStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
