import { TypographyListGroup } from '../../../components/typography/list/typography-list-group';
import { TypographyBanner } from '../../../components/typography/banner/typography-banner';
import type { InventoryHistoryItem } from './inventory-history.model';
import { INVENTORY_HISTORY_FEATURE } from './inventory-history.routes';
import { describeInventoryHistoryItem } from './inventory-history.utils';

export interface InventoryHistoryPanelProps {
  selected: InventoryHistoryItem | null;
  onClear: () => void;
}

export function InventoryHistoryPanel({
  selected,
  onClear,
}: InventoryHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeInventoryHistoryItem(selected)}
      </p>
      <TypographyListGroup
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
        <TypographyBanner
          label="Typography Banner"
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
        data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
