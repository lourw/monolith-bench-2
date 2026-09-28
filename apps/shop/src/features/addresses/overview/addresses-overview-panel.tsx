import { OverlayChipGroup } from '../../../components/overlay/chip/overlay-chip-group';
import type { AddressesOverviewItem } from './addresses-overview.model';
import { ADDRESSES_OVERVIEW_FEATURE } from './addresses-overview.routes';
import { describeAddressesOverviewItem } from './addresses-overview.utils';

export interface AddressesOverviewPanelProps {
  selected: AddressesOverviewItem | null;
  onClear: () => void;
}

export function AddressesOverviewPanel({
  selected,
  onClear,
}: AddressesOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAddressesOverviewItem(selected)}
      </p>
      <OverlayChipGroup
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
        data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
