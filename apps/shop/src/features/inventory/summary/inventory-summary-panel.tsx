import { LayoutChipGroup } from '../../../components/layout/chip/layout-chip-group';
import { InputsTile } from '../../../components/inputs/tile/inputs-tile';
import type { InventorySummaryItem } from './inventory-summary.model';
import { INVENTORY_SUMMARY_FEATURE } from './inventory-summary.routes';
import { describeInventorySummaryItem } from './inventory-summary.utils';

export interface InventorySummaryPanelProps {
  selected: InventorySummaryItem | null;
  onClear: () => void;
}

export function InventorySummaryPanel({
  selected,
  onClear,
}: InventorySummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeInventorySummaryItem(selected)}
      </p>
      <LayoutChipGroup
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
        <InputsTile
          label="Inputs Tile"
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
        data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
