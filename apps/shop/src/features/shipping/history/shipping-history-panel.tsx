import { NavigationCardGroup } from '../../../components/navigation/card/navigation-card-group';
import { DataList } from '../../../components/data/list/data-list';
import { MarketingStat } from '../../../components/marketing/stat/marketing-stat';
import type { ShippingHistoryItem } from './shipping-history.model';
import { SHIPPING_HISTORY_FEATURE } from './shipping-history.routes';
import { describeShippingHistoryItem } from './shipping-history.utils';

export interface ShippingHistoryPanelProps {
  selected: ShippingHistoryItem | null;
  onClear: () => void;
}

export function ShippingHistoryPanel({
  selected,
  onClear,
}: ShippingHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeShippingHistoryItem(selected)}
      </p>
      <NavigationCardGroup
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
        <DataList label="Data List" value={selected.product.rating} size="sm" />
        <MarketingStat
          label="Marketing Stat"
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
        data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
