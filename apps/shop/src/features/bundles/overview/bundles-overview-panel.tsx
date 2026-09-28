import { ChartsCardGroup } from '../../../components/charts/card/charts-card-group';
import type { BundlesOverviewItem } from './bundles-overview.model';
import { BUNDLES_OVERVIEW_FEATURE } from './bundles-overview.routes';
import { describeBundlesOverviewItem } from './bundles-overview.utils';

export interface BundlesOverviewPanelProps {
  selected: BundlesOverviewItem | null;
  onClear: () => void;
}

export function BundlesOverviewPanel({
  selected,
  onClear,
}: BundlesOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeBundlesOverviewItem(selected)}
      </p>
      <ChartsCardGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
