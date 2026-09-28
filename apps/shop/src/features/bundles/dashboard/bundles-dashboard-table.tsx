import { MediaCard } from '../../../components/media/card/media-card';
import type { BundlesDashboardItem } from './bundles-dashboard.model';
import { BUNDLES_DASHBOARD_FEATURE } from './bundles-dashboard.routes';
import {
  formatBundlesDashboardAmount,
  bundlesDashboardStatusTone,
} from './bundles-dashboard.utils';

export interface BundlesDashboardTableProps {
  items: ReadonlyArray<BundlesDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesDashboardTable({
  items,
  selectedId,
  onSelect,
}: BundlesDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-empty`}
      >
        No bundles dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaCard
                label={item.status}
                tone={bundlesDashboardStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
