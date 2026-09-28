import { OverlayList } from '../../../components/overlay/list/overlay-list';
import type { CatalogDashboardItem } from './catalog-dashboard.model';
import { CATALOG_DASHBOARD_FEATURE } from './catalog-dashboard.routes';
import {
  formatCatalogDashboardAmount,
  catalogDashboardStatusTone,
} from './catalog-dashboard.utils';

export interface CatalogDashboardTableProps {
  items: ReadonlyArray<CatalogDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogDashboardTable({
  items,
  selectedId,
  onSelect,
}: CatalogDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-empty`}
      >
        No catalog dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayList
                label={item.status}
                tone={catalogDashboardStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
