import { LayoutTileGroup } from '../../../components/layout/tile/layout-tile-group';
import type { TrackingWizardItem } from './tracking-wizard.model';
import { TRACKING_WIZARD_FEATURE } from './tracking-wizard.routes';
import { describeTrackingWizardItem } from './tracking-wizard.utils';

export interface TrackingWizardPanelProps {
  selected: TrackingWizardItem | null;
  onClear: () => void;
}

export function TrackingWizardPanel({
  selected,
  onClear,
}: TrackingWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${TRACKING_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${TRACKING_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${TRACKING_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeTrackingWizardItem(selected)}
      </p>
      <LayoutTileGroup
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
        data-testid={`${TRACKING_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
