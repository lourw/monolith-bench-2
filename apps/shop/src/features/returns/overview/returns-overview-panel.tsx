import { OverlayListGroup } from '../../../components/overlay/list/overlay-list-group';
import { DataList } from '../../../components/data/list/data-list';
import { OverlayBanner } from '../../../components/overlay/banner/overlay-banner';
import type { ReturnsOverviewItem } from './returns-overview.model';
import { RETURNS_OVERVIEW_FEATURE } from './returns-overview.routes';
import { describeReturnsOverviewItem } from './returns-overview.utils';

export interface ReturnsOverviewPanelProps {
  selected: ReturnsOverviewItem | null;
  onClear: () => void;
}

export function ReturnsOverviewPanel({
  selected,
  onClear,
}: ReturnsOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReturnsOverviewItem(selected)}
      </p>
      <OverlayListGroup
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
        <OverlayBanner
          label="Overlay Banner"
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
        data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
