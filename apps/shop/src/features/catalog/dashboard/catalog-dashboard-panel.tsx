import { ChartsChipGroup } from '../../../components/charts/chip/charts-chip-group';
import { FormsCard } from '../../../components/forms/card/forms-card';
import type { CatalogDashboardItem } from './catalog-dashboard.model';
import { CATALOG_DASHBOARD_FEATURE } from './catalog-dashboard.routes';
import { describeCatalogDashboardItem } from './catalog-dashboard.utils';

export interface CatalogDashboardPanelProps {
  selected: CatalogDashboardItem | null;
  onClear: () => void;
}

export function CatalogDashboardPanel({
  selected,
  onClear,
}: CatalogDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCatalogDashboardItem(selected)}
      </p>
      <ChartsChipGroup
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
        <FormsCard
          label="Forms Card"
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
        data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
