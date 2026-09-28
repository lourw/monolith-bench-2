import { MediaBannerGroup } from '../../../components/media/banner/media-banner-group';
import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import type { ShippingOverviewItem } from './shipping-overview.model';
import { SHIPPING_OVERVIEW_FEATURE } from './shipping-overview.routes';
import { describeShippingOverviewItem } from './shipping-overview.utils';

export interface ShippingOverviewPanelProps {
  selected: ShippingOverviewItem | null;
  onClear: () => void;
}

export function ShippingOverviewPanel({
  selected,
  onClear,
}: ShippingOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeShippingOverviewItem(selected)}
      </p>
      <MediaBannerGroup
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
        <CommerceBadge
          label="Commerce Badge"
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
        data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
