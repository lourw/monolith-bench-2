import { MediaPanel } from '../../../components/media/panel/media-panel';
import type { CatalogSettingsItem } from './catalog-settings.model';
import { CATALOG_SETTINGS_FEATURE } from './catalog-settings.routes';
import {
  formatCatalogSettingsAmount,
  catalogSettingsStatusTone,
} from './catalog-settings.utils';

export interface CatalogSettingsTableProps {
  items: ReadonlyArray<CatalogSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogSettingsTable({
  items,
  selectedId,
  onSelect,
}: CatalogSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-empty`}
      >
        No catalog settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaPanel
                label={item.status}
                tone={catalogSettingsStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
