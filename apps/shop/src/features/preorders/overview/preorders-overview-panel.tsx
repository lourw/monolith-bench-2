import { ChartsBadgeGroup } from '../../../components/charts/badge/charts-badge-group';
import { FormsTile } from '../../../components/forms/tile/forms-tile';
import { TypographyBanner } from '../../../components/typography/banner/typography-banner';
import type { PreordersOverviewItem } from './preorders-overview.model';
import { PREORDERS_OVERVIEW_FEATURE } from './preorders-overview.routes';
import { describePreordersOverviewItem } from './preorders-overview.utils';

export interface PreordersOverviewPanelProps {
  selected: PreordersOverviewItem | null;
  onClear: () => void;
}

export function PreordersOverviewPanel({
  selected,
  onClear,
}: PreordersOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePreordersOverviewItem(selected)}
      </p>
      <ChartsBadgeGroup
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
        <FormsTile
          label="Forms Tile"
          value={selected.product.rating}
          size="sm"
        />
        <TypographyBanner
          label="Typography Banner"
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
        data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
