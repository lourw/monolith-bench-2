import { InputsTileGroup } from '../../../components/inputs/tile/inputs-tile-group';
import { OverlayToolbar } from '../../../components/overlay/toolbar/overlay-toolbar';
import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import type { SupportOverviewItem } from './support-overview.model';
import { SUPPORT_OVERVIEW_FEATURE } from './support-overview.routes';
import { describeSupportOverviewItem } from './support-overview.utils';

export interface SupportOverviewPanelProps {
  selected: SupportOverviewItem | null;
  onClear: () => void;
}

export function SupportOverviewPanel({
  selected,
  onClear,
}: SupportOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSupportOverviewItem(selected)}
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
        <OverlayToolbar
          label="Overlay Toolbar"
          value={selected.product.rating}
          size="sm"
        />
        <ChartsTile
          label="Charts Tile"
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
        data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
