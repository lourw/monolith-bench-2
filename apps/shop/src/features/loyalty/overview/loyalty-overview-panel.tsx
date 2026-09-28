import { ChartsBannerGroup } from '../../../components/charts/banner/charts-banner-group';
import { FormsChip } from '../../../components/forms/chip/forms-chip';
import { MarketingBadge } from '../../../components/marketing/badge/marketing-badge';
import type { LoyaltyOverviewItem } from './loyalty-overview.model';
import { LOYALTY_OVERVIEW_FEATURE } from './loyalty-overview.routes';
import { describeLoyaltyOverviewItem } from './loyalty-overview.utils';

export interface LoyaltyOverviewPanelProps {
  selected: LoyaltyOverviewItem | null;
  onClear: () => void;
}

export function LoyaltyOverviewPanel({
  selected,
  onClear,
}: LoyaltyOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeLoyaltyOverviewItem(selected)}
      </p>
      <ChartsBannerGroup
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
        <FormsChip
          label="Forms Chip"
          value={selected.product.rating}
          size="sm"
        />
        <MarketingBadge
          label="Marketing Badge"
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
        data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
