import { InputsTileGroup } from '../../../components/inputs/tile/inputs-tile-group';
import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import { MediaHeader } from '../../../components/media/header/media-header';
import type { StoreLocatorHistoryItem } from './store-locator-history.model';
import { STORE_LOCATOR_HISTORY_FEATURE } from './store-locator-history.routes';
import { describeStoreLocatorHistoryItem } from './store-locator-history.utils';

export interface StoreLocatorHistoryPanelProps {
  selected: StoreLocatorHistoryItem | null;
  onClear: () => void;
}

export function StoreLocatorHistoryPanel({
  selected,
  onClear,
}: StoreLocatorHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeStoreLocatorHistoryItem(selected)}
      </p>
      <InputsTileGroup
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
        <ChartsBanner
          label="Charts Banner"
          value={selected.product.rating}
          size="sm"
        />
        <MediaHeader
          label="Media Header"
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
        data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
