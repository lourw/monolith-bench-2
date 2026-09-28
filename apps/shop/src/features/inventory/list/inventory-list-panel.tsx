import { MarketingBannerGroup } from '../../../components/marketing/banner/marketing-banner-group';
import { FeedbackPanel } from '../../../components/feedback/panel/feedback-panel';
import { CoreCard } from '../../../components/core/card/core-card';
import type { InventoryListItem } from './inventory-list.model';
import { INVENTORY_LIST_FEATURE } from './inventory-list.routes';
import { describeInventoryListItem } from './inventory-list.utils';

export interface InventoryListPanelProps {
  selected: InventoryListItem | null;
  onClear: () => void;
}

export function InventoryListPanel({
  selected,
  onClear,
}: InventoryListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${INVENTORY_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${INVENTORY_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${INVENTORY_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeInventoryListItem(selected)}
      </p>
      <MarketingBannerGroup
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
        <FeedbackPanel
          label="Feedback Panel"
          value={selected.product.rating}
          size="sm"
        />
        <CoreCard label="Core Card" value={selected.product.rating} size="sm" />
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
        data-testid={`${INVENTORY_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
