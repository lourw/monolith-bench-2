import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { CatalogHistoryItem } from './catalog-history.model';
import { CATALOG_HISTORY_FEATURE } from './catalog-history.routes';
import {
  formatCatalogHistoryAmount,
  catalogHistoryStatusTone,
} from './catalog-history.utils';

export interface CatalogHistoryTableProps {
  items: ReadonlyArray<CatalogHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogHistoryTable({
  items,
  selectedId,
  onSelect,
}: CatalogHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_HISTORY_FEATURE.testId}-empty`}
      >
        No catalog history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsBadge
                label={item.status}
                tone={catalogHistoryStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
