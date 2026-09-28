import { TypographyStatGroup } from '../../../components/typography/stat/typography-stat-group';
import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import { OverlayTile } from '../../../components/overlay/tile/overlay-tile';
import type { CatalogOverviewItem } from './catalog-overview.model';
import { CATALOG_OVERVIEW_FEATURE } from './catalog-overview.routes';
import { describeCatalogOverviewItem } from './catalog-overview.utils';

export interface CatalogOverviewPanelProps {
  selected: CatalogOverviewItem | null;
  onClear: () => void;
}

export function CatalogOverviewPanel({
  selected,
  onClear,
}: CatalogOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCatalogOverviewItem(selected)}
      </p>
      <TypographyStatGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <TypographyToolbar
          label="Typography Toolbar"
          value={selected.product.rating}
          size="sm"
        />
        <OverlayTile
          label="Overlay Tile"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
