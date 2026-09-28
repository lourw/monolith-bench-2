import { LayoutBanner } from '../../../components/layout/banner/layout-banner';
import type { CatalogDetailsItem } from './catalog-details.model';
import { CATALOG_DETAILS_FEATURE } from './catalog-details.routes';
import {
  formatCatalogDetailsAmount,
  catalogDetailsStatusTone,
} from './catalog-details.utils';

export interface CatalogDetailsTableProps {
  items: ReadonlyArray<CatalogDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogDetailsTable({
  items,
  selectedId,
  onSelect,
}: CatalogDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_DETAILS_FEATURE.testId}-empty`}
      >
        No catalog details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutBanner
                label={item.status}
                tone={catalogDetailsStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
