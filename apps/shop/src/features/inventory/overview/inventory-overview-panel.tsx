import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { FormsTile } from '../../../components/forms/tile/forms-tile';
import { NavigationList } from '../../../components/navigation/list/navigation-list';
import type { InventoryOverviewItem } from './inventory-overview.model';
import { INVENTORY_OVERVIEW_FEATURE } from './inventory-overview.routes';
import { describeInventoryOverviewItem } from './inventory-overview.utils';

export interface InventoryOverviewPanelProps {
  selected: InventoryOverviewItem | null;
  onClear: () => void;
}

export function InventoryOverviewPanel({
  selected,
  onClear,
}: InventoryOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeInventoryOverviewItem(selected)}
      </p>
      <DataStatGroup
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
        <FormsTile
          label="Forms Tile"
          value={selected.product.rating}
          size="sm"
        />
        <NavigationList
          label="Navigation List"
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
        data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
