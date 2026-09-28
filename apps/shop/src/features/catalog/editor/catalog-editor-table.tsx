import { TypographyHeader } from '../../../components/typography/header/typography-header';
import type { CatalogEditorItem } from './catalog-editor.model';
import { CATALOG_EDITOR_FEATURE } from './catalog-editor.routes';
import {
  formatCatalogEditorAmount,
  catalogEditorStatusTone,
} from './catalog-editor.utils';

export interface CatalogEditorTableProps {
  items: ReadonlyArray<CatalogEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogEditorTable({
  items,
  selectedId,
  onSelect,
}: CatalogEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_EDITOR_FEATURE.testId}-empty`}
      >
        No catalog editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyHeader
                label={item.status}
                tone={catalogEditorStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
