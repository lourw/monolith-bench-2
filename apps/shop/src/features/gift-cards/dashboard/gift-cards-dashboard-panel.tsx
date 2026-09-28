import { MediaHeaderGroup } from '../../../components/media/header/media-header-group';
import { DataToolbar } from '../../../components/data/toolbar/data-toolbar';
import type { GiftCardsDashboardItem } from './gift-cards-dashboard.model';
import { GIFT_CARDS_DASHBOARD_FEATURE } from './gift-cards-dashboard.routes';
import { describeGiftCardsDashboardItem } from './gift-cards-dashboard.utils';

export interface GiftCardsDashboardPanelProps {
  selected: GiftCardsDashboardItem | null;
  onClear: () => void;
}

export function GiftCardsDashboardPanel({
  selected,
  onClear,
}: GiftCardsDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeGiftCardsDashboardItem(selected)}
      </p>
      <MediaHeaderGroup
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
        <DataToolbar
          label="Data Toolbar"
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
        data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
