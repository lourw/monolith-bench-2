import { InputsToolbar } from '../../../components/inputs/toolbar/inputs-toolbar';
import type { CatalogListItem } from './catalog-list.model';
import { CATALOG_LIST_FEATURE } from './catalog-list.routes';
import {
  formatCatalogListAmount,
  catalogListStatusTone,
} from './catalog-list.utils';

export interface CatalogListTableProps {
  items: ReadonlyArray<CatalogListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogListTable({
  items,
  selectedId,
  onSelect,
}: CatalogListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_LIST_FEATURE.testId}-empty`}
      >
        No catalog list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_LIST_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsToolbar
                label={item.status}
                tone={catalogListStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
