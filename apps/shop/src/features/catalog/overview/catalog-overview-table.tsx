import { NavigationHeader } from '../../../components/navigation/header/navigation-header';
import type { CatalogOverviewItem } from './catalog-overview.model';
import { CATALOG_OVERVIEW_FEATURE } from './catalog-overview.routes';
import {
  formatCatalogOverviewAmount,
  catalogOverviewStatusTone,
} from './catalog-overview.utils';

export interface CatalogOverviewTableProps {
  items: ReadonlyArray<CatalogOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogOverviewTable({
  items,
  selectedId,
  onSelect,
}: CatalogOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-empty`}
      >
        No catalog overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationHeader
                label={item.status}
                tone={catalogOverviewStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
