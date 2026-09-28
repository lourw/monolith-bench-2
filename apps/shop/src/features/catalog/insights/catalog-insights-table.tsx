import { LayoutToolbar } from '../../../components/layout/toolbar/layout-toolbar';
import type { CatalogInsightsItem } from './catalog-insights.model';
import { CATALOG_INSIGHTS_FEATURE } from './catalog-insights.routes';
import {
  formatCatalogInsightsAmount,
  catalogInsightsStatusTone,
} from './catalog-insights.utils';

export interface CatalogInsightsTableProps {
  items: ReadonlyArray<CatalogInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogInsightsTable({
  items,
  selectedId,
  onSelect,
}: CatalogInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-empty`}
      >
        No catalog insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutToolbar
                label={item.status}
                tone={catalogInsightsStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
